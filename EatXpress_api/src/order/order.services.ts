import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import * as dtos from 'src/core/dtos/fs.dtos';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {

    constructor(
        private dataService:IDataServices,
        private eventEmitter: EventEmitter2,
    ){}

    //create order
    async createOrder(orderDto:dtos.CreateOrderDtoType, userId:string){
        //get the vendor
        try {
            
            let orderCount:number = await this.dataService.orders.count();
            let menu = await this.dataService.menus.getById(orderDto.menuId);
            let vendor = await this.dataService.users.getById(menu.vendorId.toString());
            let user = await this.dataService.users.getById(userId);
            
            
            let newOrder = await this.dataService.orders.create(
                {
                    menu: menu._id,
                    name:menu.name,
                    order_no: orderCount + 1,
                    payment_type: orderDto.payment_type,
                    isPaid:orderDto.isPaid,
                    vendor: vendor._id,
                    user: user._id,
                    amount:orderDto.amount,
                    quantity:orderDto.quantity,
                    status: dtos.OrderStatus.CREATED,
                    createdAt: new Date(Date.now())
                }
            );
            let deliveryInfo:dtos.ContactType = orderDto.deliveryInfo
            //send create dispatch event
            let dispatchEventPayload:dtos.dispatchEventPayload = {
                vendor:vendor._id.toString(),
                dropOff: deliveryInfo,
                order: newOrder._id.toString(),
            }
            this.eventEmitter.emit('createDispatch', dispatchEventPayload);

            this.eventEmitter.emit('newOrder', {name:vendor.name, phone:vendor.phone, menu:menu.name})
                
            return {
                success: true,
                message: "Order created successfully",
                data: { orderId: newOrder._id.toString() }
            }
        } catch (error) {
         throw new NotAcceptableException(error.message);   
        }
    }

    //accept order
    async acceptOrder(orderId:string){        
        let order = await this.dataService.orders.getById(orderId);
        if(!order) throw new NotFoundException('no order found...');
        order.status = dtos.OrderStatus.ACCEPTED
        await this.dataService.orders.update(order._id.toString(), order);
        //send order accepted text

        return {
            success: true,
            message: "you have successfully accepted the order"
        }
            
        
    }


    //cancel order
    async cancelOrder(orderId:string){
    
        let order = await this.dataService.orders.getById(orderId);
        if(!order) throw new NotFoundException('no order found...');
      
        order.status = dtos.OrderStatus.CANCELLED
        await this.dataService.orders.update(order._id.toString(), order);
        //send order accepted text

        return {
            success: true,
            message: "you have successfully cancelled the order"
        }
    }

    //complete order
    async completeOrder(orderId:string){
        let order = await this.dataService.orders.getById(orderId);
        if(!order) throw new NotFoundException('no order found...');
        
        order.status = dtos.OrderStatus.COMPLETED
        await this.dataService.orders.update(order._id.toString(), order);

        //notify riders
        this.eventEmitter.emit('orderCompleted', order._id.toString());
        
        return {
            success: true,
            message: "you have successfully completed the order"
        }
        
    }

    //get order by id
    async getById(orderId:string){
        let order = await this.dataService.orders.getById(orderId);
        if(!order){
            throw new NotFoundException('no order with that id found');
        }
        return {
            success: true,
            message: "one order found",
            data: order
        }
    }

    //get vendor orders
    async getVendorOrders(vendorId: string, page: number = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
    
        // Access the Mongoose model directly from the repository
        const orderRepo = (this.dataService.orders as any)._repository;
    
        const orders = await orderRepo.find({ vendor: vendorId })
            .lean()
            .skip(offset)
            .limit(limit + 1)
            .exec();
    
        return {
            success: true,
            message: "vendor orders found",
            data: {
                orders: orders.slice(0, limit),
                nextPage: orders.length > limit
            }
        };
    }
    

    //get user orders
    async getUserOrders(userId:string, page:number = 1){
        
            
        let orders = await this.dataService.orders.getWithPagination(
            'order_user', userId, page);
        return {
            success: true,
            message: "user orders found",
            data: { 
                orders: orders.slice(0, -1),
                nextPage: orders.length === 11 ? true : false
            }
        }
    }

    //get orders by rider
    async getRiderOrders(riderId:string){
        let orders = await this.dataService.orders.getWithPagination('order_rider', riderId, 1);
        return {
            success: true,
            message: "rider orders found",
            data: { orders }
        }
    }

    @OnEvent('set_order_ref_auth', { async : true})
    async updateOrderRefnLink(data: {orderId:string, reference:string, checkout_url:string}){
        let order = await this.dataService.orders.getById(data.orderId);

        order.payment_reference = data.reference;
        order.payment_url = data.checkout_url;
        await this.dataService.orders.update(order._id.toString(), order );
    }

    @OnEvent('set_order_paid', { async : true})
    async updateOrderPaid(reference:string){
        let order = await this.dataService.orders.getOne('order_reference', reference);

        order.isPaid = true;
        await this.dataService.orders.update(order._id.toString(), order );
    }

}