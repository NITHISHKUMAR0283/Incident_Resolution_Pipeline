import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { promises } from 'dns';
import path from 'path';

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
    async getFileContent( owner :string , repo :string , path:string, branch:string):Promise<any>{
        try{
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
            const response = await firstValueFrom(this.httpservice.get(url,{
                headers:{
                    'Accept':"application/vnd.github.raw+json",
                    'User-Agent':"Nestjs-App"
                }
            }));
            const code = response.data
        return code;
        }
        catch(err:any){
            throw new  HttpException(
                err.response?.data?.message || 'Failed to fetch',err.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

};