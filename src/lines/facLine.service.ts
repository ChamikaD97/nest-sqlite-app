import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacLine } from './facLine.entity';
import { CreateFacLineDto, UpdateFacLineDto } from './facLine.dto';

@Injectable()
export class FacLineService {
  constructor(
    @InjectRepository(FacLine)
    private readonly facLineRepository: Repository<FacLine>,
  ) {}
async removeByCodeAndId(lineCode: string, lineId: string): Promise<void> {
  const result = await this.facLineRepository.delete({ lineCode, lineId });
  if (result.affected === 0) {
    throw new NotFoundException(`Line with code ${lineCode} and ID ${lineId} not found`);
  }
}

  create(createFacLineDto: CreateFacLineDto): Promise<FacLine> {
    const facLine = this.facLineRepository.create(createFacLineDto);
    return this.facLineRepository.save(facLine);
  }

  findAll(): Promise<FacLine[]> {
    return this.facLineRepository.find();
  }

  async remove(id: number): Promise<void> {
    const result = await this.facLineRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FacLine with ID ${id} not found`);
    }
  }

  // line.service.ts
async updateByCompositeKey(lineCode: string, lineId: string, updateLineDto: UpdateFacLineDto) {
  const line = await this.facLineRepository.findOne({ where: { lineCode, lineId } });
  if (!line) {
    throw new NotFoundException(`Line with code ${lineCode} and ID ${lineId} not found`);
  }

  Object.assign(line, updateLineDto);
  return this.facLineRepository.save(line);
}

}
