import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { OfficerService } from './officer.service';
import { CreateOfficerDto } from './create-officer.dto';

@Controller('officers')
export class OfficerController {
  constructor(private readonly officerService: OfficerService) {}

  @Get()
  getAll() {
    return this.officerService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.officerService.findOne(id);
  }

  @Post()
  create(@Body() createOfficerDto: CreateOfficerDto) {
    return this.officerService.create(createOfficerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.officerService.remove(id);
  }
}
