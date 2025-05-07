export class CreateLeadNoteDto {
    readonly userId: number;
    readonly content: string;
    readonly customerId: number;
}

/*
export class CreateCustomerDto {
    readonly company_name: string;
    readonly contact_name: string;
    readonly email: string;
    readonly type_of_client: string;
    readonly phone_number: string;
    readonly address?: string;
    //Usuario
    readonly idUser: number;
    // Relacionar oportunidad (opcional)
    readonly opportunities?: CreateOpportunityDto[];
  
    // Relacionar interacciones (opcional)
    readonly interactions?: CreateInteractionDto[];
  
    // Relacionar compras (opcional)
    readonly purchases?: CreatePurchaseDto[];
  
    // Relacionar recordatorios (opcional)
    readonly reminders?: CreateReminderDto[];
  }
*/