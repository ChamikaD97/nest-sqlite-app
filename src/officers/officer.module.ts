// src/officer/officer.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Officer } from './officer.entity';
import { OfficerService } from './officer.service';
import { OfficerController } from './officer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Officer])],
  providers: [OfficerService],
  controllers: [OfficerController],
})
export class OfficerModule {}
