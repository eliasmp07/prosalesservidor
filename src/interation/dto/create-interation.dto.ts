export class CreateInteractionDto {
    readonly interaction_id: number; // Relación con cliente
    readonly interaction_type: string;
    readonly interaction_date: number;
    readonly notes?: string;
  }
  