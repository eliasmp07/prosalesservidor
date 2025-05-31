import { Injectable } from '@nestjs/common';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { ProspectingReason } from './enum/prospecting_reason';
import { CalendarEventStatus } from './enum/calendar_event_status';

@Injectable()
export class CalendarEventService {
  constructor(
    @InjectRepository(CalendarEvent)
    private calendarEventRepository: Repository<CalendarEvent>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createCalendarEventDto: CreateCalendarEventDto) {
    const userCreateEvent = await this.userRepository.findOne({
      where: { id: createCalendarEventDto.createByUser },
    });

    if (!userCreateEvent) {
      throw new Error('User who is creating the event not found');
    }

    const participants: User[] = [];

    if (
      createCalendarEventDto.participants &&
      createCalendarEventDto.participants.length > 0
    ) {
      for (const participantId of createCalendarEventDto.participants) {
        const user = await this.userRepository.findOne({
          where: { id: participantId },
        });
        if (user) {
          participants.push(user);
        }
      }
    }

    //createActivityDto.startDate ? new Date(createActivityDto.startDate) : null
    const newEvent = this.calendarEventRepository.create({
      title: createCalendarEventDto.title,
      description: createCalendarEventDto.description,
      status: createCalendarEventDto.status as CalendarEventStatus,
      prospectingReason:
        createCalendarEventDto.prospeccionReason as ProspectingReason,
      activityDate: createCalendarEventDto.activityDate
        ? new Date(createCalendarEventDto.activityDate)
        : null,
      startTime: createCalendarEventDto.startTime
        ? new Date(createCalendarEventDto.startTime)
        : null,
      endTime: createCalendarEventDto.endTime
        ? new Date(createCalendarEventDto.endTime)
        : null,
      location: createCalendarEventDto.location,
      notes: createCalendarEventDto.notes,
      createdBy: userCreateEvent, // este también estaba mal escrito antes como createByUser
      participants: participants,
    });

    return await this.calendarEventRepository.save(newEvent);
  }

  async findAll() {
  return await this.calendarEventRepository.find({
    relations: ['createdBy', 'participants'],
    order: {
      activityDate: 'DESC',
      startTime: 'DESC',
    },
  });
}


  findOne(id: number) {
    return `This action returns a #${id} calendarEvent`;
  }

  update(id: number, updateCalendarEventDto: UpdateCalendarEventDto) {
    return `This action updates a #${id} calendarEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendarEvent`;
  }
}
