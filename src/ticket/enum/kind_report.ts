export enum KindOfReport {
  FAILURE = 'FAILURE',                         // Falla general del equipo
  REPLACEMENT = 'REPLACEMENT',                 // Reemplazo de componente o dispositivo
  RELOCATION = 'RELOCATION',                   // Reubicación de equipo a otra ubicación
  MAINTENANCE = 'MAINTENANCE',                 // Mantenimiento preventivo o correctivo
  INSTALLATION = 'INSTALLATION',               // Instalación de hardware o software
  SUPPORT = 'SUPPORT',                         // Soporte técnico general
  COLLECTION = 'COLLECTION',                   // Recolección de equipo dañado o en desuso
  REMOTE_CONFIGURATION = 'REMOTE_CONFIGURATION', // Configuración remota
  TONER_DELIVERY = 'TONER_DELIVERY',           // Entrega de tóner o consumibles
  APOYO = 'APOYO' //AQUI SERIA APOYO A OTRA SUCURSAL DE LA MISMA EMPRESA PERO DE OTRA UBICACION
  
}
