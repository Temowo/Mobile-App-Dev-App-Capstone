import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as dtos from "src/core/dtos/fs.dtos";
import * as nodemailer   from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class MailSender {
    

    clientId:string;
    mailingKey:string;
    mailingUser:string;
    
    

    constructor(private configService: ConfigService){
        this.clientId =   this.configService.getOrThrow('mailingId');
        this.mailingKey = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdqvwXyWPDJA/S\nK2mqllnyJutoDaBKbNxItFPVU+ZaBIgddiqUtFeyVq5VJwjBsrJzYNcZwUioOipB\nTpv31oRfE59TDqyR4xbyjE5WZShOK5H/d8fcIoC6gGQQzFRdjMnyVvnnanU1XlqA\nIFyUC9P0sIQQcgXptHlzUXTxJzGaxZRpdu9ub4Ss/wWUBXOmXfngKpy2axMhfFGN\nl+hW5gZpjF5BRmMHn9PWriBLxLMhlPuJ3vFWZaBzQhqiBTIWATIzNoWDgw0sstOk\nruXW4RkNBvwiI7jTCf9igwhi2zbn9evZY0LkoofRfQh+PHic27qxyGdNIryHY+ej\n2Z5wYgSVAgMBAAECggEAJXj14VFj/IUdnX3j5z9EsWC+okRazFWDJWR2aEVAgjSB\nhT8Ib79M+H3RgTt9wUuPTgy+Esj1U8Y/NLZSK104qMApJbxfF205jvv5wl7YbXu9\nf1Iglhk9LxZEshleE73aYVZ6np2WrdB3AeyvFCCbh5RMTvxKm3jhRJ8fhBEkoPvk\n/sUHgglurzGwLFd8UUfBEXzybGNHlqH//VBabR5xKAk/l0h6CXIQdDC5pF+js1eM\nF4fWdPaXj2mWiEK08m1weUn5YF0FBy0TVTYkbDvkbLnWx8fQ4nEAb8hXGiF6cISH\nLPCPdXh8pYBn7f4ulxxtRpbsgiCRcT3GxqgovGmWAQKBgQDMYfBl3fIIrQnrBxol\n8847D2iMl8jhTO5evhT9tM0aX/3jj3A+kAMMbpJJhpmsU0TsRn/pZQ0yst37T+CU\nNxFu7cI7UWenActWgqfs2y7f9ywA3fKKCmZM9BuWXNXl9lbkfBnHX6zsEAOXEQJy\nCFMTZMor5CxqwTVauA9qEEDAEQKBgQDFfMa64upXb9gwA8lepXpGWvsQGQR6xc1Y\nuOP0zI1yC31CzhrBbY1dMi5ISfI5YN1IeVjAuxdFBjC+6Ze2HG6Y9EnGzfE8SV/B\nd5lrVeOmeF2eixXStSYVCBi0Yes1CU4rwu3D/+XtTyGnXI8m+EfkIOB3N9XIvNv6\nX+h0ukpARQKBgBoePfFWnpJ7QnQ1cSL+eBFWE787umEISsHyuo39Z+SB9dj5wJdO\nIgWZr7oTqFm8PmePTtNNpZUgBHwUJhfqvaCWY6be7UcLVKfWhI0hKWlXldj6g/8d\n+xrEay4Y6QC9LTd/oG+5C0kTdtH8S3q1E6C71ZYsT3zI+f+A2/9q2ktxAoGAQo/4\nx3q983SOEDjmgVES8m2t21IjUWIkAThoFNVxAzReJssi93j+QaAtO045Jx+/1bKY\nuHUWtbwNZ/uBl+7jVAhaaXh2S5SLgsDV4/iR/0TogQxt8ZP+3u3YrcunJDwbreJI\nk1xH2gFm3Wr0EPVz/a8bGPOnyb3mAvCaf+VeK2UCgYEAq7/TAx/dtLe2T6KdFBDi\nryTkfg9rMjy2VmEwHCXiK28QfJzsPH8zTbyZFatJkJqijHHAPP9iG5LHcFYI5ll6\nuE43w2QrX7klFfDHIbv4MmOgblFrr81pyvlNIS/SiYb2pJStTH++OH67oq9pkIzB\nNUK3j30ooX58mCX97Eomwng=\n-----END PRIVATE KEY-----\n';
        this.mailingUser = this.configService.getOrThrow('mailingUser');
    }

    sendVendorWelcomeMail(data:dtos.WelcomeEvent){
        fs.readFile(
            path.join(__dirname, "templates", "welcome.html"),
            "utf8",
            (err: NodeJS.ErrnoException, template: string): void=>{
              if (err) console.log(err.message);
              
                   
              template = template.replace("{{name}}", data.name);
              template = template.replace("{{token}}", data.verificationCode)
              this.sendMail(
                'Welcome',
                data.address,
                template
              )
            }
        )
    }

    sendWelcomeMail(data:dtos.WelcomeEvent){
        fs.readFile(
            path.join(__dirname, "templates", "welcome.html"),
            "utf8",
            (err: NodeJS.ErrnoException, template: string): void=>{
              if (err) console.log(err.message);
             
              template = template.replace("{{name}}", data.name);
              template = template.replace("{{token}}", data.verificationCode)
              this.sendMail(
                'Welcome',
                data.address,
                template
              )
            }
        )
    }


    sendPasswordRecoveryMail(data:{address:string, token:string}){
        fs.readFile(
            path.join(__dirname, "templates", "reset-password.html"),
            "utf8",
            (err: NodeJS.ErrnoException, template: string): void=>{
              if (err) console.log(err.message);
      
              template = template.replace("{{token}}", data.token)
              this.sendMail(
                'Password Recovery',
                data.address,
                template
              )
            }
        );
    }


    private async sendMail(subject:string, to:string, body:string,){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user:  this.mailingUser, 
                serviceClient: this.clientId,
                privateKey: this.mailingKey
            },
        });
        try {
            await transporter.verify();
            console.log('send operation verified')
            await transporter.sendMail({
                from:  this.mailingUser, 
                to,
                subject,
                html: body
            });
            console.log('sending operation done...')
        } catch (error) {
            console.log(error);
        }
    }
    
}
