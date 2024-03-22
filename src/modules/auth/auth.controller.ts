import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { IAuthUser } from 'src/constants/types';
import { AuthService } from './auth.service';
import { Auth, GetAuthUser } from './decorators/auth.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@Req() _req, @Res({ passthrough: true }) res: Response) {
    res.status(200).json({ message: 'User logged out' });
  }

  @Auth()
  @Get('user')
  getAuthUser(@GetAuthUser() user: IAuthUser) {
    return this.authService.getAuthUser(user.id);
  }
}
