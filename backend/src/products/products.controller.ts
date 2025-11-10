/* eslint-disable */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProductDto } from './dto/products.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @Roles('Admin', 'Storekeeper')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async postProducts(@Body() dto: ProductDto, @Req() req): Promise<ProductDto> {
    const userId = req.user.id;
    return await this.productService.postProducts(dto,userId);
  }

  @Roles('Admin', 'Storekeeper', 'Employee')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getProducts(): Promise<ProductDto[]> {
    return this.productService.getProducts();
  }

  @Roles('Admin', 'Storekeeper', 'Employee')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async getProductsId(@Param('id') id: number) {
    return await this.productService.getProductsId(id);
  }

  @Put('/:id')
async updateProduct(
  @Param('id') id: number,
  @Body() updateProductDto: ProductDto
): Promise<ProductDto> {
  return this.productService.putProducts(id, updateProductDto);
}


  @Delete('/:id')
  @Roles('Admin', 'Storekeeper')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteProduct(@Param('id') id: string) {
    const productId = Number(id);    
    return this.productService.deleteProducts(productId);
  }
}
