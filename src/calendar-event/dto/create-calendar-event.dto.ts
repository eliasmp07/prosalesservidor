export class CreateCalendarEventDto {
    readonly title?: string;
    readonly description? : string;
    readonly status: string;
    readonly prospeccionReason: string;
    readonly activityDate: string;
    readonly startTime: string;
    readonly endTime: string;
    readonly location?: string;
    readonly notes?: string;
    readonly createByUser: number;
    readonly participants?: number[];
}
