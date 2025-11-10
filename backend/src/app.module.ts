/* eslint-disable */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './user/user.module';
import { User } from './user/user.entity';
import { Stock } from './stock/stock.entity';
import { Products } from './products/products.entity';
@Module({
  imports: [ TypeOrmModule.forRoot({
       type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'e1g2e3123',
      database: 'stock',
      entities: [User, Products, Stock],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

