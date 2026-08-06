import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios'
import { GithubService } from './github.service';
import { contextExtractor } from './context-extractor.service';

@Module({
  imports :[HttpModule],
  providers:[GithubService,contextExtractor]
})
export class GithubModule {}
