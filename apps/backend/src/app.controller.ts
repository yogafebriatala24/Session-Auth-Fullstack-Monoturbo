import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionAuthGuard } from './auth/session-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(SessionAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.session.user;
  }
}
