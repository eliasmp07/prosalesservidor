import { CreateInteractionDto } from "src/interation/dto/create-interation.dto";
import { CreateOpportunityDto } from "src/oportunity/dto/create-oportunity.dto";
import { CreatePurchaseDto } from "src/purchase/dto/create-purchase.dto";
import { CreateReminderDto } from "src/remider/dto/create-remider.dto";

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
  