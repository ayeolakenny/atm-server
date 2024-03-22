import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'prisma.service';
import { generateRandomNumber } from 'src/utils/generatePin';
import { MAIL_MESSAGE, MAIL_SUBJECT } from '../mail/mail.constants';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './dto/user.request';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async registerUser(input: CreateUserDto) {
    const { email, name } = input;
    const pin = generateRandomNumber(4);
    const accountNumber = generateRandomNumber(10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        pin: await argon2.hash(pin),
        account: {
          create: {
            balance: 0,
            number: accountNumber,
          },
        },
      },
    });

    await this.mailService.sendMail({
      to: user.email,
      subject: MAIL_SUBJECT.REGISTRATION,
      html: MAIL_MESSAGE.REGISTRATION(accountNumber, pin),
    });
  }

  async getUserBalance(userId: string) {
    return await this.prisma.account.findUnique({
      where: {
        userId: userId,
      },
      select: {
        balance: true,
      },
    });
  }

  async withdraw(userId: string, amount: number) {
    const data = await this.prisma.account.update({
      where: {
        userId: userId,
      },
      data: {
        balance: { decrement: amount },
      },
      include: {
        user: true,
      },
    });

    await this.mailService.sendMail({
      to: data.user.email,
      subject: MAIL_SUBJECT.DEBIT,
      html: MAIL_MESSAGE.DEBIT(amount, data.balance, +data.number),
    });

    return data;
  }

  async getUserByAccount(input: any) {
    return await this.prisma.account.findUnique({
      where: {
        number: input.accountNumber,
      },
      include: {
        user: true,
      },
    });
  }

  async transfer(userId: string, input: any) {
    const { amount, accountNumber } = input;

    const account = await this.prisma.account.update({
      where: {
        number: accountNumber,
      },
      data: {
        balance: { increment: +amount },
      },
      include: {
        user: true,
      },
    });

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        account: {
          update: {
            balance: { decrement: +amount },
          },
        },
      },
      include: {
        account: true,
      },
    });

    await this.mailService.sendMail({
      to: account.user.email,
      subject: MAIL_SUBJECT.CREDIT,
      html: MAIL_MESSAGE.CREDIT(amount, user.name),
    });

    await this.mailService.sendMail({
      to: user.email,
      subject: MAIL_SUBJECT.DEBIT,
      html: MAIL_MESSAGE.TRANSFER_DEBIT(
        amount,
        user.account.balance,
        +user.account.number,
        account.user.name,
      ),
    });
  }
}
