import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryModule } from './delivery/delivery.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Delivery } from './delivery/entities/delivery.entity';


@Module({
    imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',      // your username
      password: 'root',         // your password
      database: 'perfume_shop',  // created in pgAdmin
      entities: [Delivery],      // auto load entity
      synchronize: true,         // auto create tables
      logging: true,             // show SQL in console
    }),
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
