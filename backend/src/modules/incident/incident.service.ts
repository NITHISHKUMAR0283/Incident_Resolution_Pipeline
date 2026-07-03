import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';

@Injectable()
export class IncidentService {
    create(data:CreateIncidentDto){
        return {
            message:"incident received",
            processedData:data
        };
  }
}
