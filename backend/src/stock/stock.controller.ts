/* eslint-disable */
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './dto/stock.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Roles('Admin', 'Storekeeper')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/in')
  async stockIn(@Body() dto: StockDto, @Req() req: any) {
    const user = req.user?.email || 'SYSTEM';
    return this.stockService.stockIn(dto, user);
  }

  @Roles('Admin', 'Storekeeper')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/out')
  async stockOut(@Body() dto: StockDto, @Req() req: any) {
    const user = req.user?.email || 'SYSTEM';
    return this.stockService.stockOut(dto, user);
  }

  @Roles('Admin', 'Storekeeper')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/movements')
  async stockMovements() {
    return this.stockService.getStockMovements();
  }
}
