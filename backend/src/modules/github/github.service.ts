import { HttpException, HttpStatus, Injectable, InternalServerErrorException,OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { promises } from 'dns';
import path from 'path';

@Injectable()
export class GithubService implements OnModuleInit {

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
                err.response?.data?.message || 'Failed to fetch the specified file ',err.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getCommit(owner:string,repo:string , ref:string):Promise<any>{
        
        const url = `https://api.github.com/repos/${owner}/${repo}/commits/${ref}`;
        try{
            const response = await firstValueFrom(this.httpservice.get(url,{
                headers:{ 
                    'Accept':"application/vnd.github+json",
                    'User-Agent':"Nestjs-App"
                }
            }));
            const commit = response.data;
            console.log(commit.sha);
            console.log(commit.commit.tree.sha);
            return commit;
        }
        catch(err:any){
            console.error(err.response?.data);
            throw new  HttpException(
                err.response?.data?.message || 'Failed to fetch the exact commit ',err.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
    async getTree(owner:string,repo:string , treeSha:string){
        
    const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`;
    try{
            const response = await firstValueFrom(this.httpservice.get(url,{
                headers:{
                    'Accept':"application/vnd.github+json",
                    'User-Agent':"Nestjs-App"
                }
            }));
            const tree = response.data;
            return tree;
        }
        catch(err:any){
            throw new  HttpException(
                err.response || 'Failed to fetch the exact commit ',err.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
    async searchFiles(treeData:any , query:string):Promise<any[]>{
        const files = treeData.tree.filter(
            (item:any)=>item.type==='blob'
        );
        return files.filter(
            (file:any)=>file.path.toLowerCase().includes(query.toLowerCase())).map((file:any)=>({
                path:file.path,
                sha:file.sha,
                size:file.size
            })
        );
    }
    async onModuleInit() {
                let commitData = await  this.getCommit('nestjs', 'typescript-starter', 'master');
                const tree = commitData.commit.tree.sha;
                let treefolder = await this.getTree('nestjs','typescript-starter',tree);
                
               
                const results:any = await this.searchFiles(
                    treefolder,
                    'app.controller.ts'
                );
                const code = await this.getFileContent('nestjs','typescript-starter',results[0].path,'master');
                console.log(code);
                console.log(results);
    }
};