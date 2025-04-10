import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dtos from 'src/core/dtos/fs.dtos';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs'

const cloudinary = require('cloudinary').v2;




@Injectable()
export class CloudinaryManager {
    cloudName:string;
    cloudKey:string;
    cloudSecret:string;
    
    
    constructor(private configService: ConfigService){
        this.cloudName = this.configService.get('cloudName'); 
        this.cloudKey = this.configService.get('cloudKey');
        this.cloudSecret =  this.configService.get('cloudSecret');  
    }
    
    //upload file
    async uploadFile(file:Express.Multer.File){
        
        cloudinary.config({
            cloud_name: this.cloudName,
            api_key: this.cloudKey,
            api_secret: this.cloudSecret
        });
        const res = await cloudinary.uploader.upload(file.path, { public_id: file.originalname });
       
        if(!res) {
            'upload error'
        }
        
        return res.secure_url as string; 
    

    }

    //get file
    async getFile(fileKey:string){
        
    }

    //delete file
    async deleteFile(fileKey:string){
        
    }

}




