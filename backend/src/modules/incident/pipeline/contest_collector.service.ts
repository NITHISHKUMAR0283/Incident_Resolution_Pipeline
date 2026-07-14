import {Injectable, Logger } from "@nestjs/common";

const delay = (ms:number) =>new Promise(resolve=>setTimeout(resolve,ms))

@Injectable()
export class Incident_context{
    async collect_context(){
        await delay(3000);
        Logger.log("collect_context successfull","Incident_context");
    }
}