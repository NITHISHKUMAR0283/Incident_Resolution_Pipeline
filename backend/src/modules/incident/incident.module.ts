import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { QueueModule } from '../queue/queue.module';
import { incidentprocessor } from './incidnet.processor';

@Module({
  imports:[QueueModule],
  controllers: [IncidentController],
  providers: [IncidentService,incidentprocessor]
})
export class IncidentModule {
 
}
