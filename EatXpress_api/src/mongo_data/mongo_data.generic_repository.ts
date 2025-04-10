import { NotAcceptableException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IGenericRepository } from 'src/core/abstracts/generic_repository.abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
    private _repository: Model<T>;
        

    constructor(repository: Model<T>){
        this._repository = repository;
    }

    count(): Promise<number> {
        try {
            return this._repository.find().count().exec();
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    getAll(): Promise<T[]>{
        try {
            return this._repository.find({}, {password:0}).exec();
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    getById(id: string): Promise<T> {
        try {
            return this._repository.findById(id, {password:0}).exec();
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }
    

    getOne(prop: string, value:any): Promise<T> {
        try {
            let filter = this._generateFilter(prop, value);
            
            if( 
                (this._containsAnyField(Object.keys(filter), ['email']) )
                && prop === 'auth_email'
            ){
                    return this._repository.findOne(filter).exec();
            }else{
                return this._repository.findOne(filter, { password:0 }).exec();
                
            }
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
        
    }
    

    getByField(prop: string, value:any): Promise<T[]> {
        try {
            let filter = this._generateFilter(prop, value);
            if(this._containsAnyField(Object.keys(filter), ['email', 'phone', 'role'])){
                return this._repository.find(filter, { password:0 }).exec();
            }
            else if(this._containsAnyField(Object.keys(filter), ['user'])){
                return this._repository.find(filter, { password:0 })
                .lean()
                .populate({ path:'user', select:'-password' })
                .exec() as unknown as Promise<T[]>;

            }
            else{
                return this._repository.find(filter).exec();
            }
        } catch (error) {
            throw new NotAcceptableException(error.message)
        }
    }
    
    getWithPagination(prop: any, value: any, page: number): Promise<T[]> {
        try {
            let limit = 11;
            let offset = page <= 1 ? 0 : (page - 1) * limit;

            let filter = this._generateFilter(prop, value);
            if(this._containsAnyField(Object.keys(filter), ['email', 'phone', 'role'])){
                return this._repository.find(filter, { password:0 })
                .lean()
                .skip(offset)
                .limit(limit)
                .exec() as unknown as Promise<T[]>;
            }
            else if(this._containsAnyField(Object.keys(filter), ['user'])){
                return this._repository.find(filter, { password:0 })
                .lean()
                .populate({ path:'user', select:'-password' })
                .skip(offset)
                .limit(limit)
                .exec() as unknown as Promise<T[]>;

            }
            
            else{
                return this._repository.find(filter)
                .lean()
                .skip(offset)
                .limit(limit)
                .exec() as unknown as Promise<T[]>;
            }
        } catch (error) {
            throw new NotAcceptableException(error.message)
        }
        
    }
    

    create(item: T): Promise<T> {
        try {
            return this._repository.create(item);
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    update(id: string, item: T) {
        try {
            this._repository.findByIdAndUpdate(id, item).exec();
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    _containsAnyField(list:string[], fields:string[]){
        for (let i = 0; i < fields.length; i++) {
            if (list.includes(fields[i])) {
            return true;
            }
        }
        return false;  
          
    }

    _generateFilter(prop:any, value:any){
        let filter:any;
        switch (prop) {
            case 'auth_email':
                filter = {email:value};
                break;
            
            case 'email':
                filter = {email:value};
                break;
            
            case 'phone':
                filter = {phone:value};
                break;
            
            case 'role':
                filter = {role:value};
                break; 
            
            case 'menu_vendor':
                filter = {vendor:value};
                break;
            
            case 'menu_vendorId':
                filter = {vendorId:value};
                break;

            case 'order_user':
                filter = {user:value};
                break;
            
            case 'order_vendor':
                filter = {vendor:value};
                break;
            
            case 'order_reference':
                filter = {payment_reference: value};
                break;

            case 'order_rider':
                filter = {rider:value};
                break;

            case 'dispatch_order':
                filter = {order:value};
                break;

            case 'dispatch_rider':
                filter = {rider:value};
                break;

            case 'user_defualt_address':
                filter = {user:value, default:true};
                break;

            case 'profile_user':
                filter = {user:value, default:true};
                break;

            case 'user_address':
                filter = {user:value};
                break;
            default:
                filter = {};
        }
        return filter;
    }
}
