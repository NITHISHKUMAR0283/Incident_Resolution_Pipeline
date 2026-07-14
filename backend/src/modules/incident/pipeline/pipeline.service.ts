import { Injectable,Logger } from "@nestjs/common";
import { Incident_analyser } from "./analyzer.service";
import { Incident_validator } from "./validator.service";
import { Incident_context } from "./contest_collector.service";

@Injectable()
export class Pipeline_service {
    private readonly logger = new Logger(Pipeline_service.name);
    constructor (
                private readonly context:Incident_context,
                private readonly analyse:Incident_analyser,
                private readonly validate :Incident_validator
    ){};

    async IncidentPipeline(){
    try{
        await this.context.collect_context();

        await this.analyse.analyser();
        
        await this.validate.validate();


    }
    catch(err){
        Logger.log("got error during pipeline ", err);
    }}

}