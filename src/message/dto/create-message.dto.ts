export class CreateMessageDto {
    readonly conversationId: number;
    readonly userSenderId: number;
    readonly content: string;
    readonly isRead: boolean;
    readonly rolUser: string
}
