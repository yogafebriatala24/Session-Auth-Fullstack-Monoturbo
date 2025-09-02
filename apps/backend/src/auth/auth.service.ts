import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, pass: string): Promise<any> {
    if (username === 'admin' && pass === 'password') {
      const user = { userId: 1, username: 'admin' };
      return user;
    }
    return null;
  }

  async login(username: string, pass: string) {
    const user = await this.validateUser(username, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials. Please try again.');
    }
    return user;
  }
}
