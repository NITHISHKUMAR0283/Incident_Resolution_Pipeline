import { IsString , IsNotEmpty } from "class-validator"; 

export class UpdateIncidentDto {
    @IsString()
    @IsNotEmpty()
    status:string
}