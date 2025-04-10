import * as Entity from '../entities/fs.entities';
import { IGenericRepository } from './generic_repository.abstract';
export declare abstract class IDataServices {
    abstract users: IGenericRepository<Entity.User>;
    abstract menus: IGenericRepository<Entity.Menu>;
    abstract orders: IGenericRepository<Entity.Order>;
    abstract dispatchs: IGenericRepository<Entity.Dispatch>;
    abstract transactions: IGenericRepository<Entity.Transaction>;
    abstract address: IGenericRepository<Entity.Address>;
}
