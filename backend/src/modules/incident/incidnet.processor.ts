import { InjectQueue, Processor, WorkerHost } from "@nestjs/bullmq"
import {INCIDENT_QUEUE} from '../queue/incident.queue'
import { Job} from "bullmq"
import { error } from "console";


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


@Processor(INCIDENT_QUEUE)


export class incidentprocessor extends WorkerHost{
    
    async process(job: Job<any,any,string>): Promise<any> {
        
        switch(job.name){
            case 'create_incident':
                console.log(`processing job id ${job.id} on attempt ${job.attemptsMade}`);
                const prob_fail = Math.random()<0.5;

                if(prob_fail){
                    console.error(`Failed to process job id ${job.id} on attempt ${job.attemptsMade}`);
                    throw new Error ("failed to add incident in databases");
                }

                await delay(3000);
                console.log("processed successfully")
                return "created successfully";

            default:
                console.log("unknown job name received")
        }        
    }
}