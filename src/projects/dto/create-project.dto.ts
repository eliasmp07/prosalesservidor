export class CreateProjectDto {
    nameProject: string;
    valorProject: number;
    progress:number;
    state: string;
    customerId: string;
    purchasesId: string[]; 
}
