import  { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { contact } from 'src/core/definitions/defs';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import * as swagger from '@nestjs/swagger';
import * as dtos from 'src/core/dtos/fs.dtos';


//schema definitions
@Schema()
export class Transaction {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: ObjectId;

    @Prop({ type:String, required: true })
    reference: string;
    
    @Prop({ type:Number, required:true })
    amount: number;
    
    @Prop({ type:Number, required: true })
    type: string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'User', required: true })
    user: ObjectId;
    
    @Prop({ type:Date, default:Date.now() })
    createdAt: Date;
}

@Schema()
export class Dispatch {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Order', required: true })
    order: ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Rider'})
    rider: ObjectId;
    
    @Prop({type: {
        address: {type: String, required: true},
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
        phone: {type: String, required: true},
    }, required: true})
    pickup: dtos.ContactType;
    
    @Prop({type: {
        address: {type: String, required: true},
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
        phone: {type: String, required: true},
    }, required: true})
    dropOff: dtos.ContactType;

    @Prop({ type:String, required:true })
    referenceCode: string;

    @Prop({type:Boolean, required:true, default:false })
    isPaid:boolean
    
    @Prop()
    status: string;
    
    @Prop({ type:Date, default:Date.now() })
    createdAt: Date;
}

@Schema()
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Vendor', required: true })
    vendor: ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'User', required: true })
    user: ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Menu', required: true })
    menu: ObjectId;

    @Prop({ type: String, required: true })
    name:string;

    @Prop({ type: Number, required: true })
    order_no: number;

    @Prop({ type: String, required: true })
    payment_type: string;

    @Prop({ type: String }) 
    payment_reference: string;

    @Prop({ type: String }) 
    payment_url: string;

    @Prop({ type: Boolean, required: true })
    isPaid: boolean;
    
    @Prop({ type:Number})
    amount: number;

    @Prop({type:Number })
    quantity:number;
    
    @Prop({ 
        type: String, 
        enum:["NEW", "IN_PROGRESS", "CANCELLED", "COMPLETED",], 
    })
    status: string;
    
    @Prop({ type:Date, default:Date.now() })
    createdAt: Date;
}


@Schema()
export class Menu {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Vendor', required: true })
    vendorId: ObjectId;

    @Prop()
    restaurant: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop({type: String, required: true})
    imagePath:string;

    @Prop()
    description: string;

    @Prop()
    mealType: string;

    @Prop()
    category: string;

    

}




@Schema()
export class User {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: ObjectId;

    @Prop()
    name: string;
    
    @Prop({type: String, required:true, unique:true})
    email: string;
    
    @Prop({type: String, required:true, unique:true})
    password: string;
    
    @Prop()
    phone: string;

    @Prop()
    pushToken:string;

    @Prop({ type: Number })
    orderFeePercentage:number;
    
    @Prop({ type: String })
    subAccountCode:string;
      
    @Prop({ type: String, required: true})
    role: string;
   
    @Prop({ type:String, enum:["ACTIVE", "INACTIVE",], default: "INACTIVE" })
    status: string; 

    @Prop({ type:Date, default:Date.now() })
    joinDate: Date;
   
}


@Schema()
export class Address {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: ObjectId;

    @Prop()
    street: string;
    
    @Prop()
    city: string;
    
    @Prop()
    state: string;
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'User', required: true})
    user: ObjectId;
    
    @Prop({type: Number, required: true})
    lat: number;

    @Prop({type: Number, required: true})
    lng: number;

    @Prop({ type:Boolean, default:false })
    default: boolean;
}

//mongo document type definitions
export type TransactionDocument = Transaction & mongoose.Document;
export type AddressDocument = Address & mongoose.Document;
export type DispatchDocument = Dispatch & mongoose.Document;
export type OrderDocument = Order & mongoose.Document;
export type MenuDocument = Menu & mongoose.Document;
export type UserDocument = User & mongoose.Document;

//schema factories
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
export const AddressSchema = SchemaFactory.createForClass(Address);
export const DispatchSchema = SchemaFactory.createForClass(Dispatch);
export const OrderSchema = SchemaFactory.createForClass(Order);
export const MenuSchema = SchemaFactory.createForClass(Menu);
export const UserSchema = SchemaFactory.createForClass(User);