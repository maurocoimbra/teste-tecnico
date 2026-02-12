import { Injectable } from '@nestjs/common';
import { CreateOrderWebhookDto } from '../dtos/create-order-webhook.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderWebhookMapper {
  toDomain(dto: CreateOrderWebhookDto): Order {
    return {
      id: dto.id,
      buyerName: dto.buyer.buyerName,
      buyerEmail: dto.buyer.buyerEmail,
      items: dto.lineItems.map((li) => ({
        productId: li.itemId,
        productName: li.itemName,
        quantity: li.qty,
        unitPrice: li.unitPrice,
      })),
      totalAmount: dto.totalAmount,
      createdAt: new Date(dto.createdAt),
    };
  }
}

