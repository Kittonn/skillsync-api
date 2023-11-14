import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserInfo(userId: string) {
    const user = await this.usersRepository.findOne({ id: userId });

    return this.usersRepository.exclude(user, ['password', 'refreshToken']);
  }
}
