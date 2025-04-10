import { ObjectId } from 'mongoose';
import * as dtos from "src/core/dtos/fs.dtos";
export declare class Transaction {
    _id?: ObjectId;
    reference: string;
    amount: number;
    type: string;
    user: ObjectId;
    createdAt: Date;
}
export declare class Dispatch {
    _id?: ObjectId;
    order: ObjectId;
    rider?: ObjectId;
    pickup: dtos.ContactType;
    dropOff: dtos.ContactType;
    referenceCode: string;
    isPaid: boolean;
    status: string;
    createdAt: Date;
}
export declare class Order {
    _id?: ObjectId;
    vendor: ObjectId;
    user: ObjectId;
    menu: ObjectId;
    name: string;
    order_no: number;
    payment_type: string;
    payment_reference?: string;
    payment_url?: string;
    isPaid: boolean;
    amount: number;
    quantity: number;
    status: string;
    createdAt: Date;
}
export declare class Menu {
    _id?: ObjectId;
    vendorId: ObjectId;
    restaurant: string;
    name: string;
    price: number;
    imagePath: string;
    description: string;
    mealType: string;
    category: string;
}
export declare class User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    phone: string;
    pushToken?: string;
    orderFeePercentage?: number;
    subAccountCode?: string;
    role: string;
    status: string;
    joinDate: Date;
}
export declare class Address {
    _id?: ObjectId;
    street: string;
    user: ObjectId;
    city: string;
    state: string;
    lat: number;
    lng: number;
    default: boolean;
}
