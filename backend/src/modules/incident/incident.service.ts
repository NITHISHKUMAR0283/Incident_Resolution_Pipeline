import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update_status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { skip } from 'node_modules/rxjs/dist/types';

@Injectable()
export class IncidentService {
    constructor (private readonly prisma :PrismaService){}
    async create(data:CreateIncidentDto){
        const newIncident = await this.prisma.incident.create({data});
        return {
            Incident :newIncident,
            message:"created Successfully"
        }
     }
    async UpdateStatus(id:string,body:UpdateIncidentDto){
        const updatedIncident = await this.prisma.incident.update({
            where:{id:String(id)}
            ,
            data:{
                status:body.status
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
    async getAllIncidnet(PageNo:number , size:number,status:string,severity:string){
        const Data= await this.prisma.incident.findMany({
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
