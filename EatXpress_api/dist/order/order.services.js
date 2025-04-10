"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const dtos = require("../core/dtos/fs.dtos");
const event_emitter_1 = require("@nestjs/event-emitter");
let OrderService = class OrderService {
    constructor(dataService, eventEmitter) {
        this.dataService = dataService;
        this.eventEmitter = eventEmitter;
    }
    async createOrder(orderDto, userId) {
        try {
            let orderCount = await this.dataService.orders.count();
            let menu = await this.dataService.menus.getById(orderDto.menuId);
            let vendor = await this.dataService.users.getById(menu.vendorId.toString());
            let user = await this.dataService.users.getById(userId);
            let newOrder = await this.dataService.orders.create({
                menu: menu._id,
                name: menu.name,
                order_no: orderCount + 1,
                payment_type: orderDto.payment_type,
                isPaid: orderDto.isPaid,
                vendor: vendor._id,
                user: user._id,
                amount: orderDto.amount,
                quantity: orderDto.quantity,
                status: dtos.OrderStatus.CREATED,
                createdAt: new Date(Date.now())
            });
            let deliveryInfo = orderDto.deliveryInfo;
            let dispatchEventPayload = {
                vendor: vendor._id.toString(),
                dropOff: deliveryInfo,
                order: newOrder._id.toString(),
            };
            this.eventEmitter.emit('createDispatch', dispatchEventPayload);
            this.eventEmitter.emit('newOrder', { name: vendor.name, phone: vendor.phone, menu: menu.name });
            return {
                success: true,
                message: "Order created successfully",
                data: { orderId: newOrder._id.toString() }
            };
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    async acceptOrder(orderId) {
        let order = await this.dataService.orders.getById(orderId);
        if (!order)
            throw new common_1.NotFoundException('no order found...');
        order.status = dtos.OrderStatus.ACCEPTED;
        await this.dataService.orders.update(order._id.toString(), order);
        return {
            success: true,
            message: "you have successfully accepted the order"
        };
    }
    async cancelOrder(orderId) {
        let order = await this.dataService.orders.getById(orderId);
        if (!order)
            throw new common_1.NotFoundException('no order found...');
        order.status = dtos.OrderStatus.CANCELLED;
        await this.dataService.orders.update(order._id.toString(), order);
        return {
            success: true,
            message: "you have successfully cancelled the order"
        };
    }
    async completeOrder(orderId) {
        let order = await this.dataService.orders.getById(orderId);
        if (!order)
            throw new common_1.NotFoundException('no order found...');
        order.status = dtos.OrderStatus.COMPLETED;
        await this.dataService.orders.update(order._id.toString(), order);
        this.eventEmitter.emit('orderCompleted', order._id.toString());
        return {
            success: true,
            message: "you have successfully completed the order"
        };
    }
    async getById(orderId) {
        let order = await this.dataService.orders.getById(orderId);
        if (!order) {
            throw new common_1.NotFoundException('no order with that id found');
        }
        return {
            success: true,
            message: "one order found",
            data: order
        };
    }
    async getVendorOrders(vendorId, page = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const orderRepo = this.dataService.orders._repository;
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
    async getUserOrders(userId, page = 1) {
        let orders = await this.dataService.orders.getWithPagination('order_user', userId, page);
        return {
            success: true,
            message: "user orders found",
            data: {
                orders: orders.slice(0, -1),
                nextPage: orders.length === 11 ? true : false
            }
        };
    }
    async getRiderOrders(riderId) {
        let orders = await this.dataService.orders.getWithPagination('order_rider', riderId, 1);
        return {
            success: true,
            message: "rider orders found",
            data: { orders }
        };
    }
    async updateOrderRefnLink(data) {
        let order = await this.dataService.orders.getById(data.orderId);
        order.payment_reference = data.reference;
        order.payment_url = data.checkout_url;
        await this.dataService.orders.update(order._id.toString(), order);
    }
    async updateOrderPaid(reference) {
        let order = await this.dataService.orders.getOne('order_reference', reference);
        order.isPaid = true;
        await this.dataService.orders.update(order._id.toString(), order);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('set_order_ref_auth', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "updateOrderRefnLink", null);
__decorate([
    (0, event_emitter_1.OnEvent)('set_order_paid', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "updateOrderPaid", null);
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_services_abstract_1.IDataServices,
        event_emitter_1.EventEmitter2])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.services.js.map