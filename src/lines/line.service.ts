// src/line/line.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from './line.entity';
import { CreateLineDto } from './line.dto';
@Injectable()
export class LineService {
  constructor(
    @InjectRepository(Line)
    private lineRepository: Repository<Line>,
  ) {}

  create(createLineDto: CreateLineDto) {
    const newLine = this.lineRepository.create(createLineDto);
    return this.lineRepository.save(newLine);
  }


  // src/line/line.service.ts
findAll() {
  return this.lineRepository.find();
}

}
