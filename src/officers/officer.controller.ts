import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { OfficerService } from './officer.service';
import { CreateOfficerDto, UpdateOfficerDto } from './create-officer.dto';

@Controller('officers')
export class OfficerController {
  constructor(private readonly officerService: OfficerService) { }

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
    console.log(`Deleting officer with ID: ${id}`);

    return this.officerService.remove(id);
  }


  @Put(':id')
  async update(

    @Param('id') id: number,
    @Body() updateOfficerDto: UpdateOfficerDto,
  ) {
    return this.officerService.updateOfficer(id, updateOfficerDto);
  }

}
