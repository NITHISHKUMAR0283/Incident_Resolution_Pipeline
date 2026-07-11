import { Module } from '@nestjs/common';
import { INCIDENT_QUEUE } from './incident.queue';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports:[
        BullModule.registerQueue({name:INCIDENT_QUEUE,})
    ],
    exports:[
        BullModule
    ]
})
export class QueueModule {}
