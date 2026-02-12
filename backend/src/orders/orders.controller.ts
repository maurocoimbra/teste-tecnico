import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateOrderWebhookDto } from './dtos/create-order-webhook.dto';
import { OrderWebhookMapper } from './mappers/order-webhook.mapper';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly service: OrdersService,
    private readonly mapper: OrderWebhookMapper,
  ) {}

  @Post('webhook')
  async webhook(@Body() dto: CreateOrderWebhookDto) {
    const order = this.mapper.toDomain(dto);
    return this.service.createFromWebhook(order);
  }

  @Get()
  findAll(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      // Include full end day (inclusive)
      endDate.setUTCHours(23, 59, 59, 999);
      return this.service.findByPeriod(startDate, endDate);
    }
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}

