import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import * as dtos from 'src/core/dtos/fs.dtos';
export declare class Transaction {
    _id: ObjectId;
    reference: string;
    amount: number;
    type: string;
    user: ObjectId;
    createdAt: Date;
}
export declare class Dispatch {
    _id: ObjectId;
    order: ObjectId;
    rider: ObjectId;
    pickup: dtos.ContactType;
    dropOff: dtos.ContactType;
    referenceCode: string;
    isPaid: boolean;
    status: string;
    createdAt: Date;
}
export declare class Order {
    _id: ObjectId;
    vendor: ObjectId;
    user: ObjectId;
    menu: ObjectId;
    name: string;
    order_no: number;
    payment_type: string;
    payment_reference: string;
    payment_url: string;
    isPaid: boolean;
    amount: number;
    quantity: number;
    status: string;
    createdAt: Date;
}
export declare class Menu {
    _id: ObjectId;
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
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    phone: string;
    pushToken: string;
    orderFeePercentage: number;
    subAccountCode: string;
    role: string;
    status: string;
    joinDate: Date;
}
export declare class Address {
    _id: ObjectId;
    street: string;
    city: string;
    state: string;
    user: ObjectId;
    lat: number;
    lng: number;
    default: boolean;
}
export type TransactionDocument = Transaction & mongoose.Document;
export type AddressDocument = Address & mongoose.Document;
export type DispatchDocument = Dispatch & mongoose.Document;
export type OrderDocument = Order & mongoose.Document;
export type MenuDocument = Menu & mongoose.Document;
export type UserDocument = User & mongoose.Document;
export declare const TransactionSchema: mongoose.Schema<Transaction, mongoose.Model<Transaction, any, any, any, mongoose.Document<unknown, any, Transaction> & Transaction & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Transaction, mongoose.Document<unknown, {}, mongoose.FlatRecord<Transaction>> & mongoose.FlatRecord<Transaction> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export declare const AddressSchema: mongoose.Schema<Address, mongoose.Model<Address, any, any, any, mongoose.Document<unknown, any, Address> & Address & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Address, mongoose.Document<unknown, {}, mongoose.FlatRecord<Address>> & mongoose.FlatRecord<Address> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export declare const DispatchSchema: mongoose.Schema<Dispatch, mongoose.Model<Dispatch, any, any, any, mongoose.Document<unknown, any, Dispatch> & Dispatch & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Dispatch, mongoose.Document<unknown, {}, mongoose.FlatRecord<Dispatch>> & mongoose.FlatRecord<Dispatch> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Order & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & mongoose.FlatRecord<Order> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export declare const MenuSchema: mongoose.Schema<Menu, mongoose.Model<Menu, any, any, any, mongoose.Document<unknown, any, Menu> & Menu & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Menu, mongoose.Document<unknown, {}, mongoose.FlatRecord<Menu>> & mongoose.FlatRecord<Menu> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
