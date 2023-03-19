import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Roles } from '../common/dto/app.enums';
import { JwtPayload } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AuthCredentialSignInDTO } from './dto/auth-credential-signin.dto';
import { ToggleUserActivationDto } from './dto/toggle-user-activation.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authCredential: AuthCredentialSignInDTO) {
    const { email, password } = authCredential;
    const user: User = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await user.isValidPassword(password))) {
      throw new BadRequestException('email/password is invalid');
    }

    const payload: JwtPayload = {
      email,
    };
    const token = this.createToken(payload);

    return {
      user: {
        email,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        contact: user.contact,
        role: user.role,
      },
      token,
    };
  }

  async signup(authCredential: AuthCredentialDTO) {
    const { email, contact } = authCredential;

    const checkContact = await this.userRepository.findOne({
      where: { contact },
    });
    if (checkContact) {
      throw new ConflictException('contact is already taken');
    }

    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new ConflictException('email is already taken');
    }

    user = await this.createUser(authCredential);

    const payload: JwtPayload = {
      email,
    };

    const token = this.createToken(payload);
    return {
      user: {
        id: user.id,
        firsname: user.firstname,
        fullname: user.lastname,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
      token,
    };
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        subscription: true,
      },
      where: { role: Roles.User },
    });
  }

  async everyUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOneUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUserDetails(
    user: User,
    updateDetails: UpdateUserProfileDto,
  ): Promise<User> {
    const { firstname, lastname, email, contact } = updateDetails;

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.contact = contact || user.contact;

    user = await this.userRepository.save(user);
    delete user.password;

    return user;
  }

  async deactivateUser(
    deactivateDetails: ToggleUserActivationDto,
  ): Promise<User> {
    const { email } = deactivateDetails;

    let user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    user.active = false;

    user = await this.userRepository.save(user);
    delete user.password;

    return user;
  }

  async activateUser(activateDetails: ToggleUserActivationDto): Promise<User> {
    const { email } = activateDetails;

    let user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    user.active = true;
    user = await this.userRepository.save(user);

    delete user.password;
    return user;
  }

  private createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private async createUser(authCredential: AuthCredentialDTO): Promise<User> {
    const { firstname, lastname, contact, email, password, role } =
      authCredential;

    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.contact = contact;
    user.password = password;
    user.role = role || Roles.User;

    return await this.userRepository.save(user);
  }
}
