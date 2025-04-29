
export class UpdateStatusCustomerDto{
    readonly customerId: number;
    readonly managerId: number;
    readonly userId?: number;
    readonly notesOfUpdate: string;
    readonly status: string;
}
