import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpsertProductCostDto } from './dtos/upsert-product-cost.dto';
import { ProductCostsService } from './product-costs.service';

@Controller('product-costs')
export class ProductCostsController {
  constructor(private readonly service: ProductCostsService) {}

  @Put(':productId')
  upsert(@Param('productId') productId: string, @Body() dto: UpsertProductCostDto) {
    return this.service.upsert(productId, dto.cost);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}

