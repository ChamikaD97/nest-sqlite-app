import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LeafCountService } from './leaf-count.service';
import { LeafCount } from './leaf-count.entity';
@Controller('leaf-count')
export class LeafCountController {
  constructor(private readonly service: LeafCountService) { }

  @Post()
  async createOrUpdate(@Body() data: Partial<LeafCount>) {
    try {

      return await this.service.createOrUpdate(data);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<LeafCount[]> {
    return this.service.findAll();
  }

  @Get('line/:lineCode/:year/:month') // ✅ FIXED route
  async findOne(
    @Param('lineCode') lineCode: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<LeafCount> {
    return await this.service.findOne(lineCode, +month, +year);
  }

  @Get(':year/:month')
  async findByMonthYear(
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<LeafCount[]> {

    return this.service.findByMonthYear(+month, +year);
  }

  @Delete(':lineCode/:year/:month')
  async delete(
    @Param('lineCode') lineCode: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ) {

    return this.service.delete(lineCode, +month, +year);
  }
}
