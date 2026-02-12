import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ProductCostsController } from './product-costs.controller';
import { ProductCostsService } from './product-costs.service';
import { InMemoryProductCostRepository } from './repositories/in-memory-product-cost.repository';
import { PRODUCT_COST_REPOSITORY } from './repositories/product-cost.repository';

@Module({
  imports: [ProductsModule],
  controllers: [ProductCostsController],
  providers: [
    ProductCostsService,
    { provide: PRODUCT_COST_REPOSITORY, useClass: InMemoryProductCostRepository },
  ],
  exports: [PRODUCT_COST_REPOSITORY, ProductCostsService],
})
export class ProductCostsModule {}

