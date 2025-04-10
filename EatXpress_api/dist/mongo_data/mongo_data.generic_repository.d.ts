import { Model } from 'mongoose';
import { IGenericRepository } from 'src/core/abstracts/generic_repository.abstract';
export declare class MongoGenericRepository<T> implements IGenericRepository<T> {
    private _repository;
    constructor(repository: Model<T>);
    count(): Promise<number>;
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T>;
    getOne(prop: string, value: any): Promise<T>;
    getByField(prop: string, value: any): Promise<T[]>;
    getWithPagination(prop: any, value: any, page: number): Promise<T[]>;
    create(item: T): Promise<T>;
    update(id: string, item: T): void;
    _containsAnyField(list: string[], fields: string[]): boolean;
    _generateFilter(prop: any, value: any): any;
}
