import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductCostsModule } from './product-costs/product-costs.module';

@Module({
  imports: [OrdersModule, ProductsModule, DashboardModule, ProductCostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
