import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncidentModule } from './modules/incident/incident.module';
import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule} from '@nestjs/config';
import { OnApplicationBootstrap } from '@nestjs/common';
import {BullModule} from '@nestjs/bullmq'
import { Queue} from 'bullmq'
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),

    BullModule.forRoot({
      connection:{
        host:"127.0.0.1",
        port:6379
      }
    }),

    IncidentModule,HealthModule, PrismaModule, QueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap{
  
  private readonly  logger =new Logger("Queue System");

  async onApplicationBootstrap() {
    try{
      const connectionTester = new Queue ("Health-queue",{
        connection:{host:"127.0.0.1",port:6379}});

      const client:any = await connectionTester.client;
      
      await client.ping();

      this.logger.log("memurai connected succesfully");
      connectionTester.close();
    }
    catch(err:any){
      this.logger.error(
        "failed to connect to reddis ",
        err.message,
      )
    }
  }
}
