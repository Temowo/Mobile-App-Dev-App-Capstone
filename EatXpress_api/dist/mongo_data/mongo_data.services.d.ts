import { OnApplicationBootstrap } from "@nestjs/common";
import { Model } from 'mongoose';
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { MongoGenericRepository } from "./mongo_data.generic_repository";
import * as fsModels from './models/models';
export declare class MongoDataService implements IDataServices, OnApplicationBootstrap {
    private TransactionRepository;
    private AddressRepository;
    private DispatchRepository;
    private OrderRepository;
    private MenuRepository;
    private UserRepository;
    transactions: MongoGenericRepository<fsModels.Transaction>;
    dispatchs: MongoGenericRepository<fsModels.Dispatch>;
    orders: MongoGenericRepository<fsModels.Order>;
    menus: MongoGenericRepository<fsModels.Menu>;
    users: MongoGenericRepository<fsModels.User>;
    address: MongoGenericRepository<fsModels.Address>;
    constructor(TransactionRepository: Model<fsModels.TransactionDocument>, AddressRepository: Model<fsModels.AddressDocument>, DispatchRepository: Model<fsModels.DispatchDocument>, OrderRepository: Model<fsModels.OrderDocument>, MenuRepository: Model<fsModels.MenuDocument>, UserRepository: Model<fsModels.UserDocument>);
    onApplicationBootstrap(): void;
}
