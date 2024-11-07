import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService{
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "eliasmenapech@gmail.com",
              pass: "qjli ffnc mddg zmmv",
            },
        });
      }
    
      async sendPasswordResetEmail(to: string, token: string) {
        const resetUrl = `http://3.144.8.170:3002`;
        const mailOptions = {
          from: 'tu-correo@gmail.com',
          to:to,
          subject: 'Restablecimiento de contraseña',
          text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`,
        };
    
        await this.transporter.sendMail(mailOptions);
      }
}