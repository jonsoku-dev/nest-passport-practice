import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): any {
    console.log('login controller');
    return req.user; // TODO: return JWT access Token
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Req() req): any {
    console.log('protected controller');
    return req.user; // TODO: require an Bearer token, validate token
  }
}
