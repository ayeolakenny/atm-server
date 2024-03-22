import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from 'prisma.service';
import { IAuthUser } from 'src/constants/types';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async validateUser(accountNumber: string, pin: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { account: { number: accountNumber } },
    });

    if (!user) return null;

    if (user && (await argon2.verify(user.pin, pin))) {
      return user;
    }
    return null;
  }

  async login(user: IAuthUser) {
    const payload = {
      email: user.email,
      name: user.name,
      id: user.id,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async getAuthUser(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  //
  async __checkIfUserExistsById(id: string) {
    const user = this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new BadRequestException('user does not exist.');
    return user;
  }
}
