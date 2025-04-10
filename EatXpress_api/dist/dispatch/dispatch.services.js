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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchService = void 0;
const common_1 = require("@nestjs/common");
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const dtos = require("../core/dtos/fs.dtos");
const cache_manager_1 = require("@nestjs/cache-manager");
const utils_string_generator_1 = require("../utils/utils.string_generator");
const event_emitter_1 = require("@nestjs/event-emitter");
let DispatchService = class DispatchService {
    constructor(dataService, stringGenerator, cacheManager, eventEmitter) {
        this.dataService = dataService;
        this.stringGenerator = stringGenerator;
        this.cacheManager = cacheManager;
        this.eventEmitter = eventEmitter;
    }
    async createDispatch(payload) {
        let vendor = await this.dataService.users.getById(payload.vendor);
        let vendorContact = await this.dataService.address.getOne('user', payload.vendor);
        let order = await this.dataService.orders.getById(payload.order);
        const pickupInfo = {
            address: `${vendorContact.street} ${vendorContact.city} ${vendorContact.state}`,
            lat: vendorContact.lat,
            lng: vendorContact.lng,
            phone: vendor.phone
        };
        const referenceCode = this.stringGenerator.generateRandomString();
        await this.dataService.dispatchs.create({
            order: order._id,
            pickup: pickupInfo,
            dropOff: payload.dropOff,
            referenceCode,
            isPaid: false,
            status: dtos.DispatchStatus.CREATED,
            createdAt: new Date(Date.now())
        });
    }
    async notifyRiders(orderId) {
        let dispatch = await this.dataService.dispatchs.getOne('order', orderId);
        if (!dispatch)
            throw new common_1.NotFoundException('invalid order id');
        let text = `new dispatch order from ${dispatch.pickup.address} to ${dispatch.dropOff.address}`;
        let acceptUrl = new URL(`https://172.104.234.245/api/dispatchs/accept-dispatch/${orderId}`);
        this.eventEmitter.emit('newDispatch', { text, acceptUrl });
        return {
            success: true,
            message: "dispatch alert has been sent to riders",
            data: { dispatchreference: dispatch.referenceCode }
        };
    }
    async acceptDispatch(dispatchId, riderId) {
        let dispatch = await this.dataService.dispatchs.getById(dispatchId);
        if (!dispatch) {
            throw new common_1.NotFoundException('no dispatch found');
        }
        if (dispatch.status === 'IN_PROGRESS') {
            throw new common_1.NotAcceptableException('Dispatch is no longer available');
        }
        let rider = await this.dataService.users.getById(riderId);
        if (!rider) {
            throw new common_1.NotAcceptableException('You do not have permission for the operation');
        }
        dispatch.rider = rider._id;
        dispatch.status = dtos.DispatchStatus.STARTED;
        await this.dataService.dispatchs.update(dispatch._id.toString(), dispatch);
        return {
            success: true,
            message: 'dispatch has been assigned to you',
            data: { dispatchReference: dispatch.referenceCode }
        };
    }
    async completeDispatch(dispatchId) {
        let dispatch = await this.dataService.dispatchs.getById(dispatchId);
        if (!dispatch)
            throw new common_1.NotFoundException('no dispatch found');
        if (dispatch.isPaid) {
            dispatch.status = dtos.DispatchStatus.DELIVERED;
            await this.dataService.dispatchs.update(dispatch._id.toString(), dispatch);
            return {
                success: true,
                message: 'dispatch is marked completed'
            };
        }
        else {
            return {
                success: true,
                message: 'create payment checkout',
                data: { reference: dispatch.order }
            };
        }
    }
    async getDispatch(dispatchId) {
        let dispatch = await this.dataService.dispatchs.getById(dispatchId);
        if (!dispatch)
            throw new common_1.NotFoundException('no dispatch found');
        return {
            success: true,
            message: "dispatch found",
            data: { dispatch }
        };
    }
    async getRiderDispatch(riderId, page = 1) {
        let dispatchs = await this.dataService.dispatchs.getWithPagination('dispatch_rider', riderId, page);
        return {
            success: true,
            message: dispatchs.length >= 1 ? 'dispatch by rider' : 'no dispatch found',
            data: {
                dispatchs: dispatchs.splice(0, -1),
                nextPage: dispatchs.length === 11 ? true : false
            }
        };
    }
    async updateRiderLocation(riderId, geos) {
        await this.cacheManager.set(riderId, geos, 360);
        return {
            success: true,
            message: "current coordinates saved"
        };
    }
    async trackDispatchRider(dispatchId) {
        let dispatch = await this.dataService.dispatchs.getById(dispatchId);
        if (!dispatch)
            throw new common_1.NotFoundException('no dispatch found');
        let riderCoordinates = await this.cacheManager.get(dispatch.rider.toString());
        return {
            success: true,
            message: "current rider location",
            data: riderCoordinates
        };
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('createDispatch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchService.prototype, "createDispatch", null);
__decorate([
    (0, event_emitter_1.OnEvent)('orderCompleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DispatchService.prototype, "notifyRiders", null);
DispatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [data_services_abstract_1.IDataServices,
        utils_string_generator_1.StringGenerator, Object, event_emitter_1.EventEmitter2])
], DispatchService);
exports.DispatchService = DispatchService;
//# sourceMappingURL=dispatch.services.js.map