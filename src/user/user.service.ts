import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
} from '@nestjs/common';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  findByUsername(username: string) {
    return this.userRepo.findOneBy({ username });
  }


  async create(user: Partial<User>) {
    if (!user.username || !user.password) {
      throw new BadRequestException('Username and password are required');
    }

    // Check if user already exists
    const existingUser = await this.userRepo.findOne({
      where: { username: user.username },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = {
      ...user,
      password: hashedPassword,
      role: user.role || 'user',
    };

    return this.userRepo.save(newUser);
  }






  update(id: number, user: Partial<User>) {
    return this.userRepo.update(id, user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
