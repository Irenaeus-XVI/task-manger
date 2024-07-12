import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsDate,
    IsEmail,
    IsEnum,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/gm, {
        message:
            'Password must be between 6 and 64 characters long with 1 special character and capital character each',
    })
    @MinLength(6)
    @MaxLength(64)
    password: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
