import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update_status.dto';

@Injectable()
export class IncidentService {
    create(data:CreateIncidentDto){
        return {
            message:"incident received",
            processedData:data
        };
  }
  UpdateStatus(id:string,body:UpdateIncidentDto){
    return {
        message:`incident updated the string status ${id}` 
    }
  }
}
