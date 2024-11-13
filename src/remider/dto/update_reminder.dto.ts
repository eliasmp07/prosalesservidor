export class UpdateReminderDto{
    reminder_date: number;
    description: string;
    readonly is_completed?: boolean;
}