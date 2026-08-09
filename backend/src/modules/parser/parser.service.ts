import { Injectable } from '@nestjs/common';
import Parser from 'tree-sitter'
import TypeScript from 'tree-sitter-typescript'
import { OnModuleInit } from '@nestjs/common';


@Injectable()
export class ParserService implements OnModuleInit{
    parse(code:string){
        const parser = new Parser();
        parser.setLanguage(TypeScript.typescript);

        const tree = parser.parse(code);
        return tree;
    }
    getFunctionAtLine(code:string,line:number){
        let root = this.parse(code).rootNode;
        let lineIndex = line-1;
        
        let ans:{
                  
          name:string,
          startLine:number,
          endLine:number,
          code:string

        }|null=null;

        function visit(node:Parser.SyntaxNode){
          if(ans!=null)return;
          
          if(node.type=='function_declaration' || node.type=="method_definition"){
            const starting = node.startPosition.row;
            const ending = node.endPosition.row;

            if(starting<=lineIndex && lineIndex<=ending){
              let name = ''
              for(const child of node.children){
                if(child.type=="identifier" || child.type == "property_identifier"){
                  name = child.text;
                  break;
                }
              }
            ans = {
              name:name,
              startLine:starting+1,
              endLine:ending+1,
              code:node.text

            }
            return;
            }
            
          }
          for(const child of node.children){
              visit(child);
            }

        }

        visit(root);
        return ans ;        
      
    }
    onModuleInit(){const code = `
  class AuthService {

    login(user) {
        if (!user) {
            throw new Error("User not found");
        }

        return user.name;
    }

    logout(user) {
        return true;
    }
}
`;

console.log(this.getFunctionAtLine(code, 5));
console.log(this.getFunctionAtLine(code, 12));
console.log(this.getFunctionAtLine(code, 25));
    } 

}
