import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { StringGenerator } from './utils/utils.string_generator';

@Injectable()
export class AppService {
  constructor(
    private ev:EventEmitter2,
    @Inject(CACHE_MANAGER)private cacheManager: Cache,
    private stringGenerator:StringGenerator,

  ){}
  
  async getHello() {
    //this.ev.emit('sendTest', 'Peter');
    //this.ev.emit('sendMail', 'Peter');
    let verificationCode = this.stringGenerator.generateRandomString(6);
    await this.cacheManager.set(`verify_${verificationCode}`, 'world')
    console.log('sample code: ', verificationCode)
    //await this.cacheManager.reset()
    return `welcome to food swipe : ${verificationCode}`;
  }

  async getCached(code:string) {
    let cachedData = await this.cacheManager.get<string>(`verify_${code}`);
    //console.log('cached data retrieved: ', cachedData)
    return `welcome to food swipe: ${cachedData}`;
  }
}
