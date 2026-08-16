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
                private readonly validate :Incident_validator,
                
    ){};

    async IncidentPipeline(data:any){
    try{
        let context = await this.context.collect_context(data);
        let analysis =  await this.analyse.Analyse(context);
        console.log(analysis);
        await this.validate.validate();


    }
    catch(err){
        Logger.log("got error during pipeline ", err);
    }}

}