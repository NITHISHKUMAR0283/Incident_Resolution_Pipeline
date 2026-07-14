import {Injectable, Logger } from "@nestjs/common";

const delay = (ms:number) =>new Promise(resolve=>setTimeout(resolve,ms))

@Injectable()
export class Incident_analyser{
    async analyser(){
        await delay(3000);
        Logger.log("analyse successfull","Incident analyser");
    }
}