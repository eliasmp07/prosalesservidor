const HTML_TEMPLATE_TOMORROW = (nombreCliente, fechaCita, horaCita, lugarCita, userName) => {
    return `
        <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recordatorio de Cita - CRM Propapel</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              padding: 20px;
              background-color: #f4f4f4;
          }
          .email {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
              background-color: #064688;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
          }
          .email-header h1 {
              margin: 0;
              font-size: 24px;
          }
          .email-body {
              padding: 20px;
              font-size: 16px;
              color: #333;
              line-height: 1.5;
          }
          .email-body strong {
              color: #064688;
          }
          .email-footer {
              background-color: #064688;
              color: #ffffff;
              padding: 15px;
              text-align: center;
              font-size: 14px;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
          }
          .email-footer a {
              color: #ffffff;
              text-decoration: none;
          }
          .social-icons {
              margin-top: 10px;
          }
          .social-icons img {
              width: 24px;
              margin: 0 5px;
          }
          .logo img {
             width: 50px;
              margin: 0 5px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="email">
              <div class="email-header">
                  <h1>CRM Propapel</h1>
              </div>
              <div class="email-body">
                  <p>Estimado(a) <strong>${userName}</strong>,</p>
                  <p>Este es un recordatorio de su cita programada para mañana:</p>
                  <p><strong>Cliente:</strong> ${nombreCliente}</p>
                  <p><strong>Fecha:</strong> ${fechaCita}</p>
                  <p><strong>Hora:</strong> ${horaCita}</p>
                  <p><strong>Lugar:</strong> ${lugarCita}</p>
                  <p>Si necesita reprogramar, entra en tu aplicación de CRM.</p>
              </div>
              <div class="email-footer">
                  <p>CRM | Departamento de SAI | Propapel Mérida © 2025. Todos los derechos reservados.</p>
                  <p><a href="mailto:soportesai2@propapel.com">Contactar Soporte</a></p>
              </div>
          </div>
      </div>
  </body>
  </html>
      `;
  };
  
  export default HTML_TEMPLATE_TOMORROW;
  