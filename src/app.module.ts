import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [SellerModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'irisperfumes',
    synchronize: true,
    autoLoadEntities: true
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
