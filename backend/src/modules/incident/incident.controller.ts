import { Controller, Post , Body, Patch, Param ,Delete , Get, Query} from '@nestjs/common';
import { IncidentService } from './incident.service';
import {CreateIncidentDto} from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update_status.dto';
import {IncidentStatus,Incidentseverity} from '@prisma/client'

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
    @Delete(":id")
    handleDeleteIncident(@Param("id")id:string ){
        return this.incidentService.deleteIncident(id);
    }
    @Get("/fetchall")
    getIncident(
        @Query() query:{pageno?:number;limit?:number;status?:string;severity:string }){
            const PageNo = Number(query.pageno??1)-1;
            const size = Number(query.limit??10);  
            const status  = query.status ?query.status as IncidentStatus :undefined;
            const severity = query.severity ?query.severity as Incidentseverity: undefined;          
            return this.incidentService.getAllIncidnet(PageNo,size,status,severity)
    }

}
