import { Injectable } from '@nestjs/common';

@Injectable()
export class IncidentService {
    create(){
        return {message:"incident received"};
  }
}
