import { Injectable,OnModuleInit , OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import {PrismaPg} from '@prisma/adapter-pg'
import {Pool} from 'pg'

import 'dotenv/config'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit , OnModuleDestroy{

    constructor(){
        const pool = new Pool({connectionString: process.env.DATABASE_URL})
        const adapter = new PrismaPg(pool)
        super({adapter})
    }


    async onModuleInit(){
        console.log("connected Database")
        await this.$connect();
    }

    async onModuleDestroy() {
        console.log("disconnected Database")
        await this.$disconnect();
    }

}
