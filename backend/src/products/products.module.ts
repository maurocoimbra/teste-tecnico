import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { InMemoryProductRepository } from './repositories/in-memory-product.repository';
import { PRODUCT_REPOSITORY } from './repositories/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: PRODUCT_REPOSITORY, useClass: InMemoryProductRepository },
  ],
  exports: [PRODUCT_REPOSITORY, ProductsService],
})
export class ProductsModule {}

