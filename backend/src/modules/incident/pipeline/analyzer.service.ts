import {Injectable, Logger ,OnModuleInit} from "@nestjs/common";
import OpenAI from 'openai';
import { ConfigService } from "@nestjs/config";
@Injectable()
export class Incident_analyser implements OnModuleInit{
    private openai :OpenAI;
    private readonly logger = new Logger(Incident_analyser.name);

    constructor(private config : ConfigService){};
    onModuleInit() {
        this.openai = new OpenAI({
            baseURL:'https://api.groq.com/openai/v1',
            apiKey: this.config.get<string>('Groq_API_KEY')
        })
    }
    async Analyse (context:any){
        try{
            const prompt = `
            Exception:
${context.exception}

File:
${context.file}

Error line:
${context.error_line}

Function:
${context.name}

Code:
${context.code}

Imports:
${context.imports.join('\n')};
            
            `;
        const response = await this.openai.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages:[{
                role:'system',
                content:'you are a production incident analysis system...'
            },{
                role:'user',
                content:prompt,
            },],
        })
        return response.choices[0]?.message.content || 'No analysis';
    
        }
        catch(error :any){
            this.logger.error(`Failed to analyze incided: ${error.message}`);
            throw error;
        }
    }
}