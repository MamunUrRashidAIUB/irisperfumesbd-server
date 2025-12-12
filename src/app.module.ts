import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryModule } from './delivery/delivery.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'perfume_shop',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    DeliveryModule,
    AuthModule
  ],
})
export class AppModule {}
