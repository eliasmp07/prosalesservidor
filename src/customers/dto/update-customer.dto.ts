export class UpdateCustomerDto{
    readonly company_name: string;
    readonly contact_name: string;
    readonly email: string;
    readonly type_of_client: string;
    readonly phone_number: string;
    readonly address?: string;
}