import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.request';
import { Auth, GetAuthUser } from '../auth/decorators/auth.decorator';
import { IAuthUser } from 'src/constants/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(@Body() input: CreateUserDto) {
    return await this.userService.registerUser(input);
  }

  @Get('balance')
  @Auth()
  async getBalance(@GetAuthUser() user: IAuthUser) {
    return await this.userService.getUserBalance(user.id);
  }

  @Post('withdraw')
  @Auth()
  async withdraw(@GetAuthUser() user: IAuthUser, @Body() input: any) {
    return await this.userService.withdraw(user.id, +input.amount);
  }

  @Post('transfer')
  @Auth()
  async transfer(@GetAuthUser() user: IAuthUser, @Body() input: any) {
    return await this.userService.transfer(user.id, input);
  }

  @Get('account/:accountNumber')
  async getUserByAccount(@Param() input: any) {
    return await this.userService.getUserByAccount(input);
  }
}
