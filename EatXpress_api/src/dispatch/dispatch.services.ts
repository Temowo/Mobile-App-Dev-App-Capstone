import { Injectable, Inject, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { ObjectId } from "mongodb";
import * as dtos from 'src/core/dtos/fs.dtos';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { StringGenerator } from 'src/utils/utils.string_generator';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class DispatchService {
    constructor(
        private dataService:IDataServices,
        private stringGenerator: StringGenerator,
        @Inject(CACHE_MANAGER)private cacheManager: Cache,
        private eventEmitter:EventEmitter2,
    ){}

    @OnEvent('createDispatch')
    async createDispatch(payload:dtos.dispatchEventPayload){
        let vendor = await this.dataService.users.getById(payload.vendor);
        let vendorContact = await this.dataService.address.getOne('user', payload.vendor);        
        let order = await this.dataService.orders.getById(payload.order);

        const pickupInfo:dtos.ContactType = {
            address: `${vendorContact.street} ${vendorContact.city} ${vendorContact.state}`,
            lat: vendorContact.lat,
            lng: vendorContact.lng,
            phone:vendor.phone
            
        }
        const referenceCode = this.stringGenerator.generateRandomString();
            await this.dataService.dispatchs.create({
                order:order._id,
                pickup:pickupInfo,
                dropOff:payload.dropOff,
                referenceCode,
                isPaid:false,
                status:dtos.DispatchStatus.CREATED,
                createdAt:new Date(Date.now())
            });
    }

    @OnEvent('orderCompleted')
    async notifyRiders(orderId:string){
        let dispatch = await this.dataService.dispatchs.getOne('order', orderId);
        if (!dispatch) throw new NotFoundException('invalid order id');
        
        let text = `new dispatch order from ${dispatch.pickup.address} to ${dispatch.dropOff.address}`
        let acceptUrl = new URL(`https://172.104.234.245/api/dispatchs/accept-dispatch/${orderId}`)
       
        //await this.messageHandler.notifyRiders(text, acceptUrl );
        this.eventEmitter.emit('newDispatch', {text, acceptUrl});
        return {
            success:true,
            message:"dispatch alert has been sent to riders",
            data: { dispatchreference: dispatch.referenceCode }
        }
    }

    async acceptDispatch(dispatchId:string, riderId:string){
        let dispatch = await this.dataService.dispatchs.getById(dispatchId);
        if (!dispatch) {
            throw new NotFoundException('no dispatch found');
        }

        if (dispatch.status === 'IN_PROGRESS'){
            throw new NotAcceptableException('Dispatch is no longer available');
        } 
        
        let rider = await this.dataService.users.getById(riderId);
        if(!rider){
            throw new NotAcceptableException('You do not have permission for the operation');
        }

        dispatch.rider = rider._id;
        dispatch.status = dtos.DispatchStatus.STARTED;

        await this.dataService.dispatchs.update(dispatch._id.toString(), dispatch);

        return {
            success: true,
            message: 'dispatch has been assigned to you',
            data: { dispatchReference:dispatch.referenceCode }
        }
    }

    async completeDispatch(dispatchId:string){
        let dispatch = await this.dataService.dispatchs.getById(dispatchId);
        if (!dispatch) throw new NotFoundException('no dispatch found');
        
        if(dispatch.isPaid){
            dispatch.status = dtos.DispatchStatus.DELIVERED;
    
            await this.dataService.dispatchs.update(dispatch._id.toString(), dispatch);
    
            return {
                success: true,
                message: 'dispatch is marked completed'
            }
        }else{
            return {
                success: true,
                message: 'create payment checkout',
                data: { reference: dispatch.order}
            }
        }

    }

    async getDispatch(dispatchId:string){
        let dispatch = await this.dataService.dispatchs.getById(dispatchId);
        if (!dispatch) throw new NotFoundException('no dispatch found');

        return {
            success: true,
            message: "dispatch found",
            data: { dispatch }
        }
    }

    async getRiderDispatch(riderId:string, page:number =1){
        let dispatchs = await this.dataService.dispatchs.getWithPagination('dispatch_rider', riderId, page);
        
        return {
            success: true,
            message: dispatchs.length >= 1 ? 'dispatch by rider' : 'no dispatch found',
            data: {
                dispatchs: dispatchs.splice(0, -1),
                nextPage: dispatchs.length === 11 ? true : false
            }
        }
    }

    async updateRiderLocation(riderId:string, geos:{lat:number, lng:number}){
        await this.cacheManager.set(riderId, geos, 360)
        
        return {
            success:true,
            message: "current coordinates saved"
        }
    }

    async trackDispatchRider(dispatchId:string){
        let dispatch = await this.dataService.dispatchs.getById(dispatchId);
        if (!dispatch) throw new NotFoundException('no dispatch found');

        let riderCoordinates = await this.cacheManager.get(dispatch.rider.toString());
        return {
            success: true,
            message: "current rider location",
            data: riderCoordinates
        }
    }    
}