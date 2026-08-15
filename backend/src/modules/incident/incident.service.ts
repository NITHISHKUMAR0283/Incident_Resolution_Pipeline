import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update_status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {IncidentStatus,Incidentseverity} from '@prisma/client'
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import {INCIDENT_QUEUE} from '../queue/incident.queue';

@Injectable()
export class IncidentService {
    constructor (
        private readonly prisma :PrismaService,
        @InjectQueue(INCIDENT_QUEUE)private readonly incidentqueue : Queue){}

    async create(data:CreateIncidentDto){
        
        const job = await this.incidentqueue.add('create_incident',data,{
            attempts:3,
            backoff:{
                type:'exponential',
                delay:2000
        }
        });
        

        return `addded job ${job.id}`
     }
    async UpdateStatus(id:string,body:UpdateIncidentDto){
        const updatedIncident = await this.prisma.incident.update({
            where:{id:String(id)}
            ,
            data:{
                status:body.status as IncidentStatus
            }
        })
        return {
            message:"updated successfully"
        }
  }
    async deleteIncident (id:string){
        const deteleted = await this.prisma.incident.delete({
            where:{
                id:id
            }
        })
        return {
            deletedIncident:deteleted,
            message:"deletion successfull"
        }
    }
    async getAllIncidnet(PageNo:number , size:number,status?:IncidentStatus,severity?:Incidentseverity){
        const Data= await this.prisma.incident.findMany({
            where:{
                status:status,
                severity:severity
            },
            skip:PageNo*size,
            take:size
        
        })
        return {
            data:Data,
            pageNo:PageNo,
            size:size
        }        
    }
}
