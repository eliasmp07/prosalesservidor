import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <html>
        <head>
          <title>Actualizar Contraseña</title>
        </head>
        <body>
          <h1>Restablecimiento de Contraseña</h1>
          <p>Haz clic en el botón para actualizar tu contraseña.</p>
          <form action="/auth/reset-password" method="POST">
            <input type="hidden" name="token" value="YOUR_TOKEN_HERE">
            <button type="submit">Actualizar Contraseña</button>
          </form>
        </body>
      </html>
    `;
  }
}
