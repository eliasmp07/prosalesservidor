export class CreateReminderDto {
    readonly reminder_id: number; // Relación con cliente
    readonly reminder_date: number;
    readonly description: string;
    readonly is_completed?: boolean;}