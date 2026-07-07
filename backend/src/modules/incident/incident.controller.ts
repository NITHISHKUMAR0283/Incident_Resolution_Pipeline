import { Controller, Post , Body, Patch, Param } from '@nestjs/common';
import { IncidentService } from './incident.service';
import {CreateIncidentDto} from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update_status.dto';

@Controller('incident')
export class IncidentController {
    
    constructor(private readonly incidentService : IncidentService){}

    @Post()
    handlePostIncident(@Body() createIncidentDto : CreateIncidentDto){
        return this.incidentService.create(createIncidentDto)
    }
    @Patch(":id/status")
    handleUpdateStatus(@Param('id')id :string ,@Body() updatedto :UpdateIncidentDto){
        return this.incidentService.UpdateStatus(id,updatedto)
    }

}
