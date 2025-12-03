import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entity/admin.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'hard!to-guess',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Admin]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
