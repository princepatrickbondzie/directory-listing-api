import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  Query,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Role } from '../common/helpers/methods';
import { User } from './entities/user.entity';
import { Roles } from '../common/dto/app.enums';
import { RoleGuard } from '../guards/role.guard';
import { UserAuthGuard } from '../guards/auth-user.guard';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AuthCredentialSignInDTO } from './dto/auth-credential-signin.dto';
import { ToggleUserActivationDto } from './dto/toggle-user-activation.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up user' })
  async signup(@Body() authCredential: AuthCredentialDTO) {
    return await this.authService.signup(authCredential);
  }

  @Post('signin')
  @ApiOperation({
    summary: 'Sign in user',
  })
  async signInWithEmail(@Body() authCredential: AuthCredentialSignInDTO) {
    return this.authService.signIn(authCredential);
  }

  @Get('signout')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'user successfully signed out' })
  @ApiOperation({ summary: 'Sign out user' })
  async signOut(@Request() req) {
    // TODO: Create a blacklist of tokens
    req.logout();
    return {
      message: 'user successfully signed out',
    };
  }

  @Get('users/all')
  async getEveryUser(): Promise<User[]> {
    return await this.authService.everyUser();
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return await this.authService.getAllUsers();
  }

  @Get('users')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  async getUser(): Promise<User[]> {
    return await this.authService.getAllUsers();
  }

  @Patch('me')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'updated user profile' })
  @ApiOperation({
    summary: 'Update user profile',
  })
  async updateUserDetails(
    @Request() req,
    @Body(ValidationPipe) updateDetails: UpdateUserProfileDto,
  ): Promise<User> {
    const user: User = req.user;
    return this.authService.updateUserDetails(user, updateDetails);
  }

  @Get('deactivate')
  @Role([Roles.SuperAdmin, Roles.Account])
  @UseGuards(UserAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'deactivated user' })
  @ApiOperation({
    summary: 'Deactivate a user',
  })
  async deactivateUser(
    @Query(ValidationPipe) deactivateDetails: ToggleUserActivationDto,
  ): Promise<User> {
    return await this.authService.deactivateUser(deactivateDetails);
  }

  @Get('activate')
  @Role([Roles.SuperAdmin, Roles.Account])
  @UseGuards(UserAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'activated user' })
  @ApiOperation({
    summary: 'Activate a user',
  })
  async activateUser(
    @Query(ValidationPipe) activateDetails: ToggleUserActivationDto,
  ): Promise<User> {
    return await this.authService.activateUser(activateDetails);
  }
}
