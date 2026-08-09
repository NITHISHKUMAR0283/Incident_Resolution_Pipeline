import { GithubService } from "./github.service"
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class contextExtractor {
    constructor(private readonly githubservice:GithubService,){};
    
    async extractContext(line:number,radius:number){
        
        try{
            const code :string[]= await this.githubservice.getFileContent(
                 "NITHISHKUMAR0283","handwritten_digit_recognizer_CNN","src/CNN.py","main"
            );
            let start = Math.max(0,line-radius);
            let end = Math.min(code.length,line+radius);
            return code.slice(start,end);

        }
            catch(err:any){
                   console.log("error in context Extractor ",err);
               }
    
            }
        
  
        }