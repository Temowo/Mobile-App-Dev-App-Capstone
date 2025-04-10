import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { 
    MongoGenericRepository, 
    // MongoTransactionGenericRepository,
    // MongoDispatchGenericRepository,
    // MongoOrderGenericRepository,
    // MongoMenuGenericRepository,
    // MongoAddressGenericRepository
} from "./mongo_data.generic_repository";

import * as fsModels from './models/models';


@Injectable()
export class MongoDataService implements IDataServices, OnApplicationBootstrap 
{
    transactions: MongoGenericRepository<fsModels.Transaction>;
    dispatchs: MongoGenericRepository<fsModels.Dispatch>;
    orders: MongoGenericRepository<fsModels.Order>;
    menus: MongoGenericRepository<fsModels.Menu>;
    users: MongoGenericRepository<fsModels.User>;
    address: MongoGenericRepository<fsModels.Address>;

    constructor(
        @InjectModel(fsModels.Transaction.name)
        private TransactionRepository: Model<fsModels.TransactionDocument>,

        @InjectModel(fsModels.Address.name)
        private AddressRepository: Model<fsModels.AddressDocument>,
        
        @InjectModel(fsModels.Dispatch.name)
        private DispatchRepository: Model<fsModels.DispatchDocument>,
        
        @InjectModel(fsModels.Order.name)
        private OrderRepository: Model<fsModels.OrderDocument>,
        
        @InjectModel(fsModels.Menu.name)
        private MenuRepository: Model<fsModels.MenuDocument>,

        @InjectModel(fsModels.User.name)
        private UserRepository: Model<fsModels.UserDocument>,
    ){}

    onApplicationBootstrap() {
        this.transactions = new MongoGenericRepository<fsModels.Transaction>(this.TransactionRepository);
        this.dispatchs = new MongoGenericRepository<fsModels.Dispatch>(this.DispatchRepository);
        this.orders = new MongoGenericRepository<fsModels.Order>(this.OrderRepository);
        this.menus = new MongoGenericRepository<fsModels.Menu>(this.MenuRepository);
        this.users = new MongoGenericRepository<fsModels.User>(this.UserRepository);
        this.address = new MongoGenericRepository<fsModels.Address>(this.AddressRepository);
    }
}