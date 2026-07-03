import { Controller, Post , Body } from '@nestjs/common';
import { IncidentService } from './incident.service';
import {CreateIncidentDto} from './dto/create-incident.dto';

@Controller('incident')
export class IncidentController {
    
    constructor(private readonly incidentService : IncidentService){}

    @Post()
    handlePostIncident(@Body() createIncidentDto : CreateIncidentDto){
        return this.incidentService.create(createIncidentDto)
    }

}
