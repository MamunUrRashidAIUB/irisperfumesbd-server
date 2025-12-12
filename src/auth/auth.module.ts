import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryLogin } from '../delivery/entities/delivery-login.entity';
import { Delivery } from '../delivery/entities/delivery.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryLogin, Delivery]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1h' }, // FIXED
}),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
