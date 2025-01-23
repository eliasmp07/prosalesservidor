export class CreateAppointmentDto {
    customerId: number;
    titulo: string;
    description: string;
    estado: string;
    fecha: number;
    duracion: number;
    lugar?:string;
    tipo: string;
}
