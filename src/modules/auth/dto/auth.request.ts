import { IsString } from 'class-validator';

export class passwordUpdateDto {
  @IsString()
  readonly currentPassword: string;

  @IsString()
  readonly newPassword: string;

  @IsString()
  readonly confirmPassword: string;
}
