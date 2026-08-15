import {Injectable, Logger } from "@nestjs/common";
import { ParserService } from "src/modules/parser/parser.service";
import { GithubService } from "src/modules/github/github.service";

@Injectable()
export class Incident_context{
    constructor(
        private readonly github:GithubService,
        private readonly parser:ParserService
    ){};
    async collect_context(data:any){
        
        let file = data.file;
        let line = data.line;
        let owner = data.owner;
        let repo = data.repository;
        let branch = data.branch;
        let code = await this.github.getFileContent(owner,repo,file,branch);
        
        let context = await this.parser.getFunctionAtLine(code,line);
        (context as any)['repository']= data.repository;
        (context as any).file = data.file;
        (context as any).exception = data.exception ;
        (context as any).error_line = data.line;
        (context as any).branch = data.branch;
        console.log(context)

        Logger.log("collect_context successfull","Incident_context");
        return context;
    }
}