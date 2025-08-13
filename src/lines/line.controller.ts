// src/line/line.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { LineService } from './line.service';
import { CreateLineDto } from './line.dto';
import { log } from 'console';

@Controller('lines')
export class LineController {
  constructor(private readonly lineService: LineService) {}

  // Create new line
  @Post()
  create(@Body() createLineDto: CreateLineDto) {
    console.log('Creating new line:', createLineDto);
    return this.lineService.create(createLineDto);
  }

  // Get all lines
  @Get()
  findAll() {
  console.  log('Fetching all lines');
    return this.lineService.findAll();
  }
}

