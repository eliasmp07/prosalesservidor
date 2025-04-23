import {
    IsString,
    IsEnum,
    IsBoolean,
    IsOptional,
    IsInt,
    IsDateString,
    IsArray,
  } from 'class-validator';
  
  export class CreateActivityDto {
    @IsEnum(['CALL', 'MEETING', 'TASK', 'EMAIL', 'OTHER','IN_PERSON'])
    type: 'CALL' | 'MEETING' | 'TASK' | 'EMAIL' | 'OTHER' | 'IN_PERSON';
  
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsDateString()
    @IsOptional()
    startDate?: string;
  
    @IsDateString()
    @IsOptional()
    endDate?: string;
  
    @IsBoolean()
    reminder: boolean;
  
    @IsDateString()
    @IsOptional()
    reminderDate?: string;
  
    @IsEnum(['PENDING', 'COMPLETED', 'CANCELLED', 'IN_PROGRESS'])
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'IN_PROGRESS';
  
    @IsEnum(['HIGH', 'MEDIUM', 'LOW'])
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
  
    @IsString()
    @IsOptional()
    notes?: string;
  
    @IsBoolean()
    @IsOptional()
    isPrivate?: boolean;
  
    @IsString()
    @IsOptional()
    category?: string;
  
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    attachments?: string[];
  
    @IsInt()
    customerId: number;
  }
  