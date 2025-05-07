import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Like, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { User } from 'src/users/user.entity';
import { Reminder } from 'src/remider/entity/remider.entity';
import { Purchase } from 'src/purchase/entity/purchase.entity';
import { Interaction } from 'src/interation/entity/interation.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LeadHistory } from 'src/lead-history/entities/lead-history.entity';
import { LeadAction } from 'src/enums/lead-action';
import { UpdateStatusCustomerDto } from './dto/update_status_customer.dto';
import { LeadStatus } from 'src/enums/lead_status';
import { ManagerReviewStatus } from 'src/enums/lead_manager_review';
import { MailService } from 'src/auth/service/MailService';
import { NotifityAlertAssignedCustomer } from 'src/auth/service/notifityAlertAssignedCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private mailService: MailService,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Opportunity)
    private opportunitiesRepository: Repository<Opportunity>,
    @InjectRepository(Interaction)
    private interactionsRepository: Repository<Interaction>,
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    @InjectRepository(Reminder)
    private remindersRepository: Repository<Reminder>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(LeadHistory)
    private leadHistoryRepository: Repository<LeadHistory>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const {
      opportunities,
      interactions,
      purchases,
      reminders,
      ...customerData
    } = createCustomerDto;

    const user = await this.userRepository.findOne({
      where: { id: createCustomerDto.idUser },
    });

    // Crear el cliente
    const customer = this.customersRepository.create(customerData);
    customer.user = user;

    await this.customersRepository.save(customer);

    // Crear las oportunidades relacionadas (si se proporcionaron)
    if (opportunities) {
      const opportunityEntities = opportunities.map((opportunityDto) => {
        return this.opportunitiesRepository.create({
          ...opportunityDto,
          customer,
        });
      });
      await this.opportunitiesRepository.save(opportunityEntities);
    }

    // Crear las interacciones relacionadas (si se proporcionaron)
    if (interactions) {
      const reminderEntities = interactions.map((reminderDto) => {
        return this.remindersRepository.create({
          ...reminderDto,
          customer,
        });
      });

      await this.remindersRepository.save(reminderEntities);
    }

    // Crear las compras relacionadas (si se proporcionaron)
    if (purchases) {
      const purchaseEntities = purchases.map((purchaseDto) => {
        return this.purchasesRepository.create({
          ...purchaseDto,
          customer,
        });
      });
      await this.purchasesRepository.save(purchaseEntities);
    }

    // Crear los recordatorios relacionados (si se proporcionaron)
    if (reminders) {
      const reminderEntities = reminders.map((reminderDto) => {
        return this.remindersRepository.create({
          ...reminderDto,
          customer,
        });
      });
      await this.remindersRepository.save(reminderEntities);
    }

    return customer;
  }

  async createNewVersion(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const {
      opportunities,
      interactions,
      purchases,
      reminders,
      ...customerData
    } = createCustomerDto;

    const user = await this.userRepository.findOne({
      where: { id: createCustomerDto.idUser },
    });

    // Crear el cliente
    const customer = this.customersRepository.create(customerData);
    customer.user = user;

    await this.customersRepository.save(customer);

    // Crear las oportunidades relacionadas (si se proporcionaron)

    // Crear las compras relacionadas (si se proporcionaron)
    if (purchases) {
      const purchaseEntities = purchases.map((purchaseDto) => {
        return this.purchasesRepository.create({
          ...purchaseDto,
          customer,
        });
      });
      await this.purchasesRepository.save(purchaseEntities);
    }

    // Crear los recordatorios relacionados (si se proporcionaron)
    if (reminders) {
      const reminderEntities = reminders.map((reminderDto) => {
        return this.remindersRepository.create({
          ...reminderDto,
          customer,
        });
      });
      await this.remindersRepository.save(reminderEntities);
    }

    await this.leadHistoryRepository.save({
      customerId: customer.customer_id,
      action: LeadAction.CREATED,
      performedById: user.id,
    });

    return customer;
  }

  async getCustomerById(customerId: number) {
    const customer = await this.customersRepository.findOne({
      relations: ['opportunities', 'interactions', 'purchases', 'reminders'],
      where: {
        customer_id: customerId,
      },
    });

    await this.customersRepository.save(customer); // Persistir el progreso calculado

    return customer;
  }

  async getMyCustomer(id: number) {
    const getMyCustomers = await this.customersRepository.find({
      where: { user: { id } }, // Filtra por el id del usuario relacionado,
      relations: ['opportunities', 'interactions', 'purchases', 'reminders'],
    });

    // Usar map para calcular el progreso y actualizar al mismo tiempo
    const updatedCustomers = await Promise.all(
      getMyCustomers.map(async (customer) => {
        customer.calculateProgress(id);
        return this.customersRepository.save(customer); // Guardar los cambios
      }),
    );
    return { customers: updatedCustomers };
  }

  async getAllCustomersBySucursal() {
    const customers = await this.customersRepository.find({
      where: {
        user: {
          email: Like('%@propapel.com.mx'),
        },
      },
      relations: [
        'opportunities',
        'interactions',
        'purchases',
        'reminders',
        'projects',
        'user.sucursales',
      ],
    });
  }
  /*
  async categorizeLeads() {
    const customers = await this.customersRepository.find({
        relations: ['opportunities', 'interactions', 'purchases', 'reminders', 'projects']
    });

    // Categorías de clientes
    const categorizedLeads = {
        total: customers.length,
        contactado: [],
        interesado: [],
        negociacion: [],
        cerrado: []
    };

    customers.forEach((customer) => {
        if (customer.progressLead === 100) {
            categorizedLeads.cerrado.push(customer);
        } else if (
            customer.projects.some(project => project.status === 'En negociacion')
        ) {
            categorizedLeads.negociacion.push(customer);
        } else if (customer.purchases && customer.purchases.length > 0) {
            categorizedLeads.interesado.push(customer);
        } else if (customer.interactions && customer.interactions.length > 0) {
            categorizedLeads.contactado.push(customer);
        }
    });

    return categorizedLeads;
}
*/
  async updateStatusLead(updateStatusCustomerDto: UpdateStatusCustomerDto) {
    const { customerId, status, userId, managerId } = updateStatusCustomerDto;

    const customerFound = await this.customersRepository.findOne({
      where: { customer_id: customerId },
    });

    let userAnteriorAssing = null;

    if (updateStatusCustomerDto.userId != null) {
      userAnteriorAssing = customerFound.user.id;
    }

    if (!customerFound) {
      throw new HttpException('Nose encontro el cliente', HttpStatus.NOT_FOUND);
    }

    customerFound.managerReviewStatus =
      ManagerReviewStatus[status as keyof typeof ManagerReviewStatus];

    if (userId != null) {
      const userAssigned = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!userAssigned) {
        throw new HttpException(
          'Nose encontro el usuario',
          HttpStatus.NOT_FOUND,
        );
      }

      customerFound.user = userAssigned;
    }

    await this.customersRepository.save(customerFound); // Guardar cambios en el cliente

    let leadAction: LeadAction;

    switch (ManagerReviewStatus[status as keyof typeof ManagerReviewStatus]) {
      case ManagerReviewStatus.REVIEWED:
        leadAction = LeadAction.REVIEWED;
        break;
      case ManagerReviewStatus.IN_PROGRESS:
        leadAction = LeadAction.ACCEPTED;
        break;
      case ManagerReviewStatus.DISCARDED:
        leadAction = LeadAction.DISCARDED;
        break;
      default:
        leadAction = LeadAction.REASSIGNED;
        break;
    }

    if (leadAction == LeadAction.REASSIGNED) {
      await this.leadHistoryRepository.save({
        customerId: customerFound.customer_id,
        action: leadAction,
        performedById: managerId,
        userAnteriorAssing: userAnteriorAssing,
        userAssigned: updateStatusCustomerDto.userId,
        notes: updateStatusCustomerDto.notesOfUpdate,
      });
      const notif = new NotifityAlertAssignedCustomer();
      notif.emailUserAssignment = customerFound.user.email;
      notif.customer = customerFound.company_name;
      notif.user = customerFound.user.name;

      await this.mailService.notifityNewAssigmentLead(notif);
    } else {
      await this.leadHistoryRepository.save({
        customerId: customerFound.customer_id,
        action: leadAction,
        performedById: managerId,
        notes: updateStatusCustomerDto.notesOfUpdate,
      });
    }
    return {
      message: 'Customer status updated successfully',
      customerId: customerFound.customer_id,
      newStatus: customerFound.managerReviewStatus,
      assignedUser: userId ?? null,
    };
  }

  async getFunnerCharByBrach(branch: string) {
    const customers = await this.customersRepository.find({
      where: {
        user: {
          sucursales: {
            nombre: branch, // Asegúrate de que `nombre` es un atributo correcto de Sucursales
          },
          email: Like('%@propapel.com.mx'),
        },
      },
      relations: [
        'opportunities',
        'interactions',
        'purchases',
        'reminders',
        'projects',
      ],
    });

    const funnelData = {
      prospectos: customers.length,
      contactados: customers.filter((c) => c.progressLead == 25).length,
      interesados: customers.filter(
        (c) => c.progressLead == 40 || c.progressLead == 60,
      ).length,
      negociacion: customers.filter(
        (c) => c.progressLead == 90, //c.projects.some((p) => p.status === 'En negociacion'),
      ).length,
      cerrados: customers.filter((c) => c.progressLead == 100).length,
    };

    return funnelData;
  }
  async categorizeLeads() {
    const customers = await this.customersRepository.find({
      where: {
        user: {
          email: Like('%@propapel.com.mx'),
        },
      },
      relations: [
        'opportunities',
        'interactions',
        'purchases',
        'reminders',
        'projects',
      ],
    });

    const funnelData = {
      prospectos: customers.length,
      contactados: customers.filter(
        (c) => c.interactions && c.interactions.length > 0,
      ).length,
      interesados: customers.filter(
        (c) => c.purchases && c.purchases.length > 0,
      ).length,
      negociacion: customers.filter((c) =>
        c.projects.some((p) => p.status === 'En negociacion'),
      ).length,
      cerrados: customers.filter(
        (c) =>
          c.projects.some((p) => p.status === 'Cierre') ||
          c.progressLead === 100,
      ).length,
    };

    return funnelData;
  }

  async getAllCustomer() {
    const customers = await this.customersRepository.find({
      where: {
        user: {
          email: Like('%@propapel.com.mx'),
        },
      },
      relations: ['opportunities', 'interactions', 'purchases', 'reminders'],
    });
    return { customers: customers };
  }
  /**
   *  Funcion que devuelve todos los lead registrados
   *  
   */
  async findAll() {
    const customers = await this.customersRepository.find({
      where: {
        user: {
          email: Like('%@propapel.com.mx'),
        },
      },
      relations: ['opportunities', 'interactions', 'purchases', 'reminders', 'notes'],
    });
    return { customers: customers };
  }

  /**
   * 
   */

  async findById(id: number) {
    const customer = await this.customersRepository.findOne({
      relations: ['opportunities', 'interactions', 'purchases', 'reminders', 'notes'],
      where: {
        customer_id: id
      },
    });

    await this.customersRepository.save(customer); // Persistir el progreso calculado

    return customer;
  }

  /**
   * Funcion para trabajar las llamadas de un solo lead
   * @param idCustomer F
   * @param updateCustomerDto 
   */
  async findByUserId(id: number) {
    const getMyCustomers = await this.customersRepository.find({
      where: { user: { id } }, // Filtra por el id del usuario relacionado,
      relations: ['opportunities', 'interactions', 'purchases', 'reminders', 'notes'],
    });

    // Usar map para calcular el progreso y actualizar al mismo tiempo
    const updatedCustomers = await Promise.all(
      getMyCustomers.map(async (customer) => {
        customer.calculateProgress(id);
        return this.customersRepository.save(customer); // Guardar los cambios
      }),
    );
    return { customers: updatedCustomers };
  }

  async updateCustomer(
    idCustomer: number,
    updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.customersRepository.findOneBy({
      customer_id: idCustomer,
    });

    // Use `updateCustomerDto` directly to set fields
    customer.address = updateCustomerDto.address;
    customer.company_name = updateCustomerDto.company_name;
    customer.contact_name = updateCustomerDto.contact_name;
    customer.email = updateCustomerDto.email;
    customer.type_of_client = updateCustomerDto.type_of_client;

    // Assign updated fields to `customer` and rename the result variable
    const updatedCustomer = Object.assign(customer, updateCustomerDto);
    await this.customersRepository.save(updatedCustomer);
  }

  async findAllCustomerByUserId(id: number) {
    const getMyCustomers = await this.customersRepository.find({
      where: { user: { id } }, // Filtra por el id del usuario relacionado,
      relations: ['opportunities', 'interactions', 'purchases', 'reminders', 'notes'],
    });

    // Usar map para calcular el progreso y actualizar al mismo tiempo
    const updatedCustomers = await Promise.all(
      getMyCustomers.map(async (customer) => {
        customer.calculateProgress(id);
        return this.customersRepository.save(customer); // Guardar los cambios
      }),
    );
    return { customers: updatedCustomers };
  }
}
