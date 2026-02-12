import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderWebhookMapper } from './mappers/order-webhook.mapper';
import { InMemoryOrderRepository } from './repositories/in-memory-order.repository';
import { ORDER_REPOSITORY } from './repositories/order.repository';

@Module({
  imports: [ProductsModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderWebhookMapper,
    { provide: ORDER_REPOSITORY, useClass: InMemoryOrderRepository },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}

