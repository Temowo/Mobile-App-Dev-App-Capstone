export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;

    abstract count(): Promise<number>;

    abstract create(item: T)  : Promise<T>;
    
    abstract update(id: string, item:T);
    
    abstract getById(id: string): Promise<T>;
    
    abstract getOne(prop:any, value:any): Promise<T>;
    
    abstract getByField(prop:any, value:any): Promise<T[]>;
    
    abstract getWithPagination(prop:any, value:any, page: number): Promise<T[]>;
    
}