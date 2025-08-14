import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Officer } from './officer.entity';
import { CreateOfficerDto, UpdateOfficerDto } from './create-officer.dto';
import e from 'express';
import { log } from 'console';

@Injectable()
export class OfficerService {
  constructor(
    @InjectRepository(Officer)
    private readonly officerRepository: Repository<Officer>,
  ) { }

  findAll(): Promise<Officer[]> {
    return this.officerRepository.find();
  }

  findOne(id: number): Promise<Officer | null> {
    return this.officerRepository.findOneBy({ id });
  }

  create(createOfficerDto: CreateOfficerDto): Promise<Officer> {
    const officer = this.officerRepository.create(createOfficerDto);
    console.log(`Creating officer with name: ${officer.name}, NIC: ${officer.nic}, Joined Date: ${officer.joinedDate}`);
    
    if (!officer.name.startsWith('Mr.')) {
      officer.name = `Mr. ${officer.name}`;
      return this.officerRepository.save(officer);
    } else {
      return this.officerRepository.save(officer);
    }
  }

  async remove(id: number): Promise<void> {
    await this.officerRepository.delete(id);
  }



  async updateOfficer(id: number, updateOfficerDto: UpdateOfficerDto): Promise<Officer> {
    console.log(`Updating officer with ID: ${id}, Name: ${updateOfficerDto.name}, NIC: ${updateOfficerDto.nic}, Joined Date: ${updateOfficerDto.joinedDate}`);
    
    const officer = await this.officerRepository.findOne({ where: { id } });
    await this.officerRepository.delete(id);

    if (!officer) {
      throw new NotFoundException(`Officer with id ${id} not found`);
    }

    this.create(updateOfficerDto);
    return this.officerRepository.save(officer);
  }
}
