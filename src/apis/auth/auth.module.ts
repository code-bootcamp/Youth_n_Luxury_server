import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt-social-kakao';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    jwtAccessStrategy,
    JwtKakaoStrategy,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    AuthResolver, //
    AuthService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
