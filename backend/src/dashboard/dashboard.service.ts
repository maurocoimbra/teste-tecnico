import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { ProductCostsService } from '../product-costs/product-costs.service';

function parseStartDate(input: string): Date {
  // aceita YYYY-MM-DD ou ISO completo
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return new Date(`${input}T00:00:00.000Z`);
  }
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) throw new BadRequestException('Invalid start date');
  return d;
}

function parseEndDate(input: string): Date {
  // aceita YYYY-MM-DD ou ISO completo
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return new Date(`${input}T23:59:59.999Z`);
  }
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) throw new BadRequestException('Invalid end date');
  return d;
}

@Injectable()
export class DashboardService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productCostsService: ProductCostsService,
  ) {}

  async getSummary(start?: string, end?: string) {
    if ((start && !end) || (!start && end)) {
      throw new BadRequestException('Provide both start and end, or none');
    }

    const hasPeriod = Boolean(start && end);
    const startDate = hasPeriod ? parseStartDate(start!) : undefined;
    const endDate = hasPeriod ? parseEndDate(end!) : undefined;

    const orders = hasPeriod
      ? await this.ordersService.findByPeriod(startDate!, endDate!)
      : await this.ordersService.findAll();

    const revenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

    const productIdsInOrders = new Set<string>();
    for (const o of orders) {
      for (const item of o.items) {
        productIdsInOrders.add(item.productId);
      }
    }
    const costs = await this.productCostsService.findByProductIds(
      Array.from(productIdsInOrders),
    );
    const costMap = new Map(costs.map((c) => [c.productId, c.cost]));

    let costTotal = 0;
    const missing = new Set<string>();

    for (const o of orders) {
      for (const item of o.items) {
        const c = costMap.get(item.productId);
        if (c === undefined) {
          missing.add(item.productId);
          continue; // custo desconhecido => ignora (fica 0)
        }
        costTotal += item.quantity * c;
      }
    }

    const profit = revenue - costTotal;

    return {
      period: hasPeriod ? { start: startDate!.toISOString(), end: endDate!.toISOString() } : null,
      ordersCount: orders.length,
      revenue,
      cost: costTotal,
      profit,
      missingCostProductIds: Array.from(missing.values()),
    };
  }
}

