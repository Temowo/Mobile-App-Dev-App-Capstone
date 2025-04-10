import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { StringGenerator } from './utils/utils.string_generator';
export declare class AppService {
    private ev;
    private cacheManager;
    private stringGenerator;
    constructor(ev: EventEmitter2, cacheManager: Cache, stringGenerator: StringGenerator);
    getHello(): Promise<string>;
    getCached(code: string): Promise<string>;
}
