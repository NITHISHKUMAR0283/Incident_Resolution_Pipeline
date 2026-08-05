import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { promises } from 'dns';
import { OnModuleInit } from '@nestjs/common';

@Injectable()
export class GithubService {

    constructor (
        private readonly httpservice:HttpService
    ){}
    async getrepository( owner :string , repo :string ):Promise<any>{
        const url = `https://api.github.com/repos/${owner}/${repo}`;
        try{
            const response = await firstValueFrom(
                this.httpservice.get(url,{
                    headers:{
                        'Accept':"application/vnd.github+json",
                        'User-Agent':"Nestjs-App"
                    }
                }
                )
            )
            return response.data;
        }
        catch(err:any){
            throw new  HttpException(
                err.response?.data?.message || 'Failed to fetch',err.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
    async onModuleInit(){
        try{
        const data = await this.getrepository(
            "NITHISHKUMAR0283","handwritten_digit_recognizer_CNN"
        )
        console.log({
      name: data.name,
      default_branch: data.default_branch,
      private: data.private,
      clone_url: data.clone_url,
      updated_at: data.updated_at
    });

    }
    catch(err:any){
        console.log(err.message);
    }

}
};