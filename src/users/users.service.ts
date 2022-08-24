import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);

    return this.toResponse(user);
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map(this.toResponse);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('NO USER');
    }

    return this.toResponse(user);
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('No user');
    }
    if (user.password !== dto.oldPassword) {
      throw new Error('No password');
      // throw new UserInvalidPasswordError();
    }

    return this.userRepository
      .save({ ...user, password: dto.newPassword, version: user.version + 1 })
      .then(this.toResponse);
  }

  async remove(id: string) {
    const user = await this.userRepository.delete(id);

    if (!user.affected) {
      // throw new UserNotFoundError();
      throw new Error('No user');
    }

    return user;
  }

  private toResponse({ password, createdAt, updatedAt, ...user }: User) {
    return {
      ...user,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    };
  }
}
