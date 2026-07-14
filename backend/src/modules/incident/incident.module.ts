import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { QueueModule } from '../queue/queue.module';
import { incidentprocessor } from './incidnet.processor';
import { Pipeline_service } from './pipeline/pipeline.service';
import { Incident_context } from './pipeline/contest_collector.service';
import { Incident_analyser } from './pipeline/analyzer.service';
import { Incident_validator } from './pipeline/validator.service';

@Module({
  imports:[QueueModule],
  controllers: [IncidentController],
  providers: [IncidentService,incidentprocessor,Pipeline_service,
    Incident_context,
    Incident_analyser,
    Incident_validator
  ]
})
export class IncidentModule {
 
}
