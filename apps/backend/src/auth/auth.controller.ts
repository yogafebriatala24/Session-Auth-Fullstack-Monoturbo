import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SessionAuthGuard } from './session-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Request() req) {
    const user = await this.authService.login(body.username, body.password);
    console.log('SESSION DATA', req.session);
    req.session.user = user;
    return { message: 'Login berhasil' };
  }

  @UseGuards(SessionAuthGuard)
  @Get('status')
  status(@Request() req) {
    return req.session.user;
  }

  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Sesi gagal:', err);
        return res
          .status(500)
          .send({ message: 'Could not log out, please try again.' });
      }
      res.clearCookie('connect.sid', { path: '/' });
      return res.status(200).send({ message: 'Logged out successfully' });
    });
  }
}
