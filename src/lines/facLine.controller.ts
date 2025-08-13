import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { FacLineService } from './facLine.service';
import { CreateFacLineDto, UpdateFacLineDto } from './facLine.dto';

@Controller('lines')
export class FacLineController {
  constructor(private readonly facLineService: FacLineService) {}

  @Post()
  create(@Body() createFacLineDto: CreateFacLineDto) {
    return this.facLineService.create(createFacLineDto);
  }
@Put(':lineCode/:lineId')
  async update(
    @Param('lineCode') lineCode: string,
    @Param('lineId') lineId: string,
    @Body() updateLineDto: UpdateFacLineDto,
  ) {
    return this.facLineService.updateByCompositeKey(lineCode, lineId, updateLineDto);
  }
  @Get()
  findAll() {
    return this.facLineService.findAll();
  }
 @Delete(':lineCode/:lineId')
  async remove(@Param('lineCode') lineCode: string, @Param('lineId') lineId: string) {
    return this.facLineService.removeByCodeAndId(lineCode, lineId);
  }
}
