import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { TargetService } from './target.service';
import { Target } from './target.entity';

@Controller('targets')
export class TargetController {
  constructor(private readonly targetService: TargetService) { }

  // 📥 Bulk insert targets
  @Post('bulk')
  async createAll(
    @Body()
    targets: { lineCode: string; target: number; month: number; year: number }[],
  ) {
    try {
      return await this.targetService.createAll(targets);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // 📊 Get all targets
  @Get()
  findAll(): Promise<Target[]> {
    return this.targetService.findAll();
  }

  // 📆 Get targets by month + year
  @Get(':year/:month')
  findByMonthYear(
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<Target[]> {
    return this.targetService.findByMonthYear(+month, +year);
  }
  @Delete(':lineCode/:year/:month')
  async deleteTarget(
    @Param('lineCode') lineCode: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    try {
      return await this.targetService.deleteTarget(lineCode, +month, +year);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
  // ✏️ Update a target by lineCode, year, month
  @Put(':lineCode/:year/:month')
  async update(
    @Param('lineCode') lineCode: string,
    @Param('year') year: number,
    @Param('month') month: number,
    @Body('target') newTarget: number,
  ) {
    try {
      return await this.targetService.updateTarget(
        lineCode,
        +month,
        +year,
        newTarget,
      );
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
