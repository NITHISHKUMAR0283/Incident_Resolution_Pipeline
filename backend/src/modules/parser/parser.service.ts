import { Injectable } from '@nestjs/common';
import Parser from 'tree-sitter'
import TypeScript from 'tree-sitter-typescript'
import { OnModuleInit } from '@nestjs/common';


@Injectable()
export class ParserService {
    parse(code:string){
        const parser = new Parser();
        
        parser.setLanguage(TypeScript.typescript);
        
        const tree = parser.parse(code);
        return tree;
    }
    getFunctionAtLine(code:string,line:number){
        let root = this.parse(code).rootNode;
        let lineIndex = line-1;
        let imps:string[]=[];
        for(const child of root.children){
          if(child.type==='import_statement'){
            imps.push(child.text);
          }
        }
        let ans:{
          imports :string[],
          name:string,
          startLine:number,
          endLine:number,
          code:string

        }|null=null;

        function visit(node:Parser.SyntaxNode){
          
          if(node.type=='function_declaration' || node.type=="method_definition" ||node.type==='arrow_function'){
            const starting = node.startPosition.row;
            const ending = node.endPosition.row;

            if(starting<=lineIndex && lineIndex<=ending){
              let name = ''
              for(const child of node.children){
                
                if(child.type=="identifier" || child.type == "property_identifier" ){
                  name = child.text;
                  break;
                }
                else if (node.type ==='arrow_function'){
                  const parent = node.parent;
                  if(parent){
                    for(const child of parent.children){
                      if(child.type ==='identifier'){
                        name = child.text;
                        break;
                      }
                    }
                  }
                }
              }
            ans = {
              imports:imps,
              name:name,
              startLine:starting+1,
              endLine:ending+1,
              code:node.text

            }
            
            }
            
          }
          for(const child of node.children){
              visit(child);
            }

        }

        visit(root);
        return ans ;        
      
    }}
