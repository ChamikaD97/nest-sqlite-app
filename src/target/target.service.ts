import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from './target.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepo: Repository<Target>,
  ) { }

  async createAll(targets: { lineCode: string; target: number; month: number; year: number }[]) {
    return this.targetRepo.save(targets);
  }

  findAll() {
    return this.targetRepo.find();
  }

  findByMonthYear(month: number, year: number) {
        

    return this.targetRepo.find({
      
      where: { month, year },
    });
  }
  async updateTarget(lineCode: string, month: number, year: number, target: number) {
    const existing = await this.targetRepo.findOne({
      where: { lineCode, month, year },
    });

    if (existing) {
      existing.target = target;
      return await this.targetRepo.save(existing);
    } else {
      const newEntry = this.targetRepo.create({
        lineCode,
        year,
        month,
        target,
      });
      return await this.targetRepo.save(newEntry);
    }
  }

  async deleteTarget(lineCode: string, month: number, year: number): Promise<Target> {
    const target = await this.targetRepo.findOne({
      where: { lineCode, month, year },
    });

    if (!target) {
      throw new Error(`Target not found for ${lineCode} (${month}/${year})`);
    }

    return await this.targetRepo.remove(target);
  }


}
