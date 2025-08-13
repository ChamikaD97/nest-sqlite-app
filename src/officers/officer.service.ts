import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Officer } from './officer.entity';
import { CreateOfficerDto } from './create-officer.dto';

@Injectable()
export class OfficerService {
  constructor(
    @InjectRepository(Officer)
    private readonly officerRepository: Repository<Officer>,
  ) {}

  findAll(): Promise<Officer[]> {
    return this.officerRepository.find();
  }

  findOne(id: number): Promise<Officer | null> {
    return this.officerRepository.findOneBy({ id });
  }

  create(createOfficerDto: CreateOfficerDto): Promise<Officer> {
    const officer = this.officerRepository.create(createOfficerDto);
    return this.officerRepository.save(officer);
  }

  async remove(id: number): Promise<void> {
    await this.officerRepository.delete(id);
  }
}
