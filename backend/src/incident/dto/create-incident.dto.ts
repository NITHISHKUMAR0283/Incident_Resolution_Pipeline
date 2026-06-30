import {IsInt, IsNotEmpty, IsOptional, IsString,Min} from 'class-validator'


export enum EnvironmentStatus{
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development'
}
export class CreateIncidentDto {
    
    @IsString()
    @IsNotEmpty()
    repository:string;
    @IsString()
    @IsNotEmpty()
    branch:string;
    @IsString()
    @IsNotEmpty()
    commitSha:string;
    @IsString()
    @IsNotEmpty()
    exception:string;
    @IsString()
    @IsNotEmpty()
    file:string;
    @IsInt()    
    @Min(1)
    line:number
    @IsOptional()
    @IsString()
    environment:EnvironmentStatus
}
