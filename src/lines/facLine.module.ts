import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacLineService } from './facLine.service';
import { FacLineController } from './facLine.controller';
import { FacLine } from './facLine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FacLine])],
  providers: [FacLineService],
  controllers: [FacLineController],
})
export class FacLineModule {}
