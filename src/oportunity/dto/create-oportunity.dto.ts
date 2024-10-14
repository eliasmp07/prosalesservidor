export class CreateOpportunityDto {
    readonly opportunity_id: number; // Relación con cliente
    readonly is_opportunity: boolean;
    readonly potential_sale: number;
    readonly status: string;
    readonly follow_up_tasks?: string;
  }
  