import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    public call(){
    return {"status":"ok"}}
}
