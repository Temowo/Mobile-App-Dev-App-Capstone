import { IDataServices } from "src/core/abstracts/data_services.abstract";
import * as dtos from 'src/core/dtos/fs.dtos';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class OrderService {
    private dataService;
    private eventEmitter;
    constructor(dataService: IDataServices, eventEmitter: EventEmitter2);
    createOrder(orderDto: dtos.CreateOrderDtoType, userId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            orderId: string;
        };
    }>;
    acceptOrder(orderId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    cancelOrder(orderId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    completeOrder(orderId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(orderId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").Order;
    }>;
    getVendorOrders(vendorId: string, page?: number): Promise<{
        success: boolean;
        message: string;
        data: {
            orders: any;
            nextPage: boolean;
        };
    }>;
    getUserOrders(userId: string, page?: number): Promise<{
        success: boolean;
        message: string;
        data: {
            orders: import("../core/entities/fs.entities").Order[];
            nextPage: boolean;
        };
    }>;
    getRiderOrders(riderId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            orders: import("../core/entities/fs.entities").Order[];
        };
    }>;
    updateOrderRefnLink(data: {
        orderId: string;
        reference: string;
        checkout_url: string;
    }): Promise<void>;
    updateOrderPaid(reference: string): Promise<void>;
}
