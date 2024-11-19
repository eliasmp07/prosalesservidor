import { UpdatePurchaseDto } from "src/purchase/dto/update-purchase.dto";

export class CreateProjectDto {
    nameProject: string;
    valorProject: number;
    progress:number;
    state: string;
    prioridad: string;
    customerId: string;
    purchases?: UpdatePurchaseDto[];; 
}
