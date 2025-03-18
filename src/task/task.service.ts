import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { alertReminderDto } from 'src/auth/dto/alert_reminder.dto';
import { MailService } from 'src/auth/service/MailService';
import { RemiderService } from 'src/remider/remider.service';

@Injectable()
export class TaskService {
  constructor(
    private mailService: MailService,
    private remindersRepository: RemiderService,
  ) {}

  private formatAMAndPM(hour: number): string {
    return hour >= 0 && hour < 12 ? "AM" : "PM";
  }


  // Cron job para verificar las citas a las 9:30 AM
  @Cron(CronExpression.EVERY_DAY_AT_9AM, {
    name: 'citas antes es mero dia',
    timeZone: 'America/Mexico_City',
  }) // A las 9 AM todos los días
  async handlerEveryAt9AM() {
    const reminders =
      await this.remindersRepository.getAllReminderByNotification();

    reminders.reminders.forEach((reminder) => {
      const timestamp: number = Number(reminder.reminder_date);
      const dateUTC = new Date(timestamp).toISOString();
      const reminderDate = new Date(dateUTC);
      const today = new Date();

      // Verificar si la cita es hoy
      if (
        reminderDate.getUTCFullYear() === today.getUTCFullYear() &&
        reminderDate.getUTCMonth() === today.getUTCMonth() &&
        reminderDate.getUTCDate() === today.getUTCDate()
      ) {
        const alertReminder: alertReminderDto = {
          user: reminder.customer.user.name,
          client: reminder.customer.company_name,
          // Hora en formato UTC
          time: `${reminderDate.getUTCHours().toString().padStart(2, '0')}:${reminderDate.getUTCMinutes().toString().padStart(2, '0')} ${this.formatAMAndPM(reminderDate.getUTCHours())}`,
          email: reminder.customer.user.email,
          date: reminderDate.toLocaleDateString(),
          direcction: reminder.typeAppointment, // Corregí el typo de 'direcction' a 'direction'
        };

        // Enviar correo de alerta
        this.mailService.sendAlertEmail(alertReminder);
      }
    });

    console.log('Aquí se enviará el correo de notificación');
  }

  // Cron job para enviar recordatorio un día antes de la cita
  @Cron(CronExpression.EVERY_DAY_AT_9AM, {
    name: 'citas un dia antes',
    timeZone: 'America/Mexico_City',
  }) // A las 9 AM todos los días
  async handlerOneDayBefore() {
    const reminders =
      await this.remindersRepository.getAllReminderByNotification();

    reminders.reminders.forEach((reminder) => {
      const timestamp: number = Number(reminder.reminder_date);
      const dateUTC = new Date(timestamp).toISOString();
      const reminderDate = new Date(dateUTC);
      const today = new Date();
      const oneDayBefore = new Date(reminderDate);
      oneDayBefore.setDate(reminderDate.getDate() - 1); // Restar un día

      // Verificar si la cita es mañana
      if (
        oneDayBefore.getUTCFullYear() === today.getUTCFullYear() &&
        oneDayBefore.getUTCMonth() === today.getUTCMonth() &&
        oneDayBefore.getUTCDate() === today.getUTCDate()
      ) {
        const alertReminder: alertReminderDto = {
          user: reminder.customer.user.name,
          client: reminder.customer.company_name,
          // Hora en formato UTC
          time: `${reminderDate.getUTCHours().toString().padStart(2, '0')}:${reminderDate.getUTCMinutes().toString().padStart(2, '0')} ${this.formatAMAndPM(reminderDate.getUTCHours())}`,
          email: reminder.customer.user.email,
          date: reminderDate.toLocaleDateString(),
          direcction: reminder.typeAppointment,
        };

        // Enviar correo de alerta para el día siguiente
        this.mailService.sendAlertEmailTommorrow(alertReminder);
      }
    });

    console.log(
      'Aquí se enviará el correo de recordatorio para el día siguiente',
    );
  }

  // Cron job para enviar recordatorio una hora antes de la cita
  @Cron(CronExpression.EVERY_HOUR, {
    name: 'citas antes de una hora',
    timeZone: 'America/Mexico_City',
  }) // Cada hora, verificar si la cita es en una hora
  async handlerOneHourBefore() {
    const reminders =
      await this.remindersRepository.getAllReminderByNotification();

    reminders.reminders.forEach((reminder) => {
      const timestamp: number = Number(reminder.reminder_date);
      const dateUTC = new Date(timestamp).toISOString();
      const reminderDate = new Date(dateUTC);
      const today = new Date();
      const oneHourBefore = new Date(reminderDate);
      oneHourBefore.setHours(reminderDate.getHours() - 1); // Restar una hora

      // Verificar si la cita es en una hora
      if (
        oneHourBefore.getUTCFullYear() === today.getUTCFullYear() &&
        oneHourBefore.getUTCMonth() === today.getUTCMonth() &&
        oneHourBefore.getUTCDate() === today.getUTCDate() &&
        oneHourBefore.getUTCHours() === today.getUTCHours()
      ) {
        const alertReminder: alertReminderDto = {
          user: reminder.customer.user.name,
          client: reminder.customer.company_name,
          // Hora en formato UTC
          time: `${reminderDate.getUTCHours().toString().padStart(2, '0')}:${reminderDate.getUTCMinutes().toString().padStart(2, '0')} ${this.formatAMAndPM(reminderDate.getUTCHours())}`,
          email: reminder.customer.user.email,
          date: reminderDate.toLocaleDateString(),
          direcction: reminder.typeAppointment,
        };

        // Enviar correo de alerta una hora antes
        this.mailService.sendAlertEmailInOneHour(alertReminder);
      }
    });

    console.log(
      'Aquí se enviará el correo de recordatorio para una hora antes',
    );
  }
}
