const HTML_ASSING_USER_ALERT = (
  nombreCliente,
  userName,
) => {
  return `
        <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Nuevo Cliente Asignado - CRM Propapel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
        }
        .email {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
        .email-header {
            background-color: #064688;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 22px;
            letter-spacing: 1px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            font-size: 16px;
            line-height: 1.6;
        }
        .email-body p {
            margin-bottom: 15px;
        }
        .email-body strong {
            color: #064688;
        }
        .email-footer {
            background-color: #064688;
            color: #ffffff;
            text-align: center;
            font-size: 13px;
            padding: 15px 20px;
        }
        .email-footer a {
            color: #ffffff;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="email">
            <div class="email-header">
                <h1>Nuevo Cliente Asignado</h1>
            </div>
            <div class="email-body">
                <p>Hola <strong>${userName}</strong>,</p>

                <p>Te informamos que se te ha asignado un nuevo cliente en el CRM para su seguimiento.</p>

                <p><strong>Nombre del cliente:</strong> ${nombreCliente}</p>

                <p>Ingresa a la plataforma CRM para revisar los detalles y dar seguimiento oportuno.</p>

                <p>¡Éxito en tu gestión!</p>
            </div>
            <div class="email-footer">
                <p>CRM Propapel | Departamento de SAI | Mérida © 2025</p>
                <p><a href="mailto:soportesai2@propapel.com">soportesai2@propapel.com</a></p>
            </div>
        </div>
    </div>
</body>
</html>
      `;
};

export default HTML_ASSING_USER_ALERT;
