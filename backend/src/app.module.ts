import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncidentModule } from './modules/incident/incident.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [IncidentModule,HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
