import {Injectable, Logger } from "@nestjs/common";

const delay = (ms:number) =>new Promise(resolve=>setTimeout(resolve,ms))

@Injectable()
export class Incident_validator{
    async validate(){
        await delay(3000);
        Logger.log("validation successfull","Incident_validator");
    }
}