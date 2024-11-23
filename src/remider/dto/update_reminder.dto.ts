export class UpdateReminderDto{
    reminder_date: number;
    description: string;
    typeAppointment: string;
    readonly is_completed?: boolean;
}