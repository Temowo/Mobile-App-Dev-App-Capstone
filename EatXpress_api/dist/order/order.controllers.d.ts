import { OrderService } from './order.services';
import * as dtos from 'src/core/dtos/fs.dtos';
import { Request } from 'express';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: dtos.CreateOrderDtoType, req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            orderId: string;
        };
    }>;
    getVendorOrders(page: number, req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            orders: any;
            nextPage: boolean;
        };
    }>;
    getUserOrders(page: number, req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            orders: import("../core/entities/fs.entities").Order[];
            nextPage: boolean;
        };
    }>;
    getRiderOrders(req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            orders: import("../core/entities/fs.entities").Order[];
        };
    }>;
    getOrderById(orderId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").Order;
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
}
