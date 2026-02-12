import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get()
  getDashboard(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.service.getSummary(start, end);
  }
}

