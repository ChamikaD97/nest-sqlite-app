// src/target/target.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Target } from './target.entity';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Target])],
  providers: [TargetService],
  controllers: [TargetController],
})
export class TargetModule {}
