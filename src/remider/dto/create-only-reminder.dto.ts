export class CreateOnlyReminderDto {
    reminder_date: number;
    description: string;
    readonly is_completed?: boolean;
    customerId: number;  // ID del cliente al que pertenece el recordatorio
}