export class CreatePurchaseDto {
    readonly customerId: number; // Relación con cliente
    readonly product_service_name: string;
    readonly purchase_date: number;
    readonly amount: number;
  }
  