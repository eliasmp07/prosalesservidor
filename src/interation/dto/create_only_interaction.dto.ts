import { CreatePurchaseDto } from "src/purchase/dto/create-purchase.dto";

export class CreateOnlyInteractionDto {
    readonly interaction_type: string;
    readonly interaction_date: number;
    readonly notes?: string;
    readonly customerId: number;
    readonly purchases?: CreatePurchaseDto[];
  }
  