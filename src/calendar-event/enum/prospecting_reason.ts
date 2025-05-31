export enum ProspectingReason {
  COLD_PROSPECTION = 'COLD_PROSPECTION',         // Prospección en frío
  FOLLOW_UP = 'FOLLOW_UP',                       // Seguimiento de contacto previo
  CUSTOMER_REFERRAL = 'CUSTOMER_REFERRAL',       // Recomendación de un cliente
  SCHEDULED_MEETING = 'SCHEDULED_MEETING',       // Reunión agendada con prospecto
  EVENT_PARTICIPATION = 'EVENT_PARTICIPATION',   // Participación en eventos o ferias
  STRATEGIC_VISIT = 'STRATEGIC_VISIT',           // Visita a cliente estratégico
  DOOR_TO_DOOR = 'DOOR_TO_DOOR',                 // Prospección territorial sin agenda
  CAMPAIGN_VISIT = 'CAMPAIGN_VISIT',             // Parte de una campaña comercial
  PARTNER_REFERRAL = 'PARTNER_REFERRAL',         // Referencia de socio o aliado
}