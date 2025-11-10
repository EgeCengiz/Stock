import { Injectable, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { UsersModule } from './user/user.module';
import { User } from './user/user.entity';
import { Products } from './products/products.entity';
import { Stock } from './stock/stock.entity';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'e1g2e3123',
      database: 'stock',
      entities: [User, Products, Stock],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'uvwforgsjgksjgs',
      signOptions: { expiresIn: '1h' },
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
