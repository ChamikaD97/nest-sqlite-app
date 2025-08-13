import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeafCountService } from './leaf-count.service';
import { LeafCountController } from './leaf-count.controller';
import { LeafCount } from './leaf-count.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeafCount])],
  providers: [LeafCountService],
  controllers: [LeafCountController],
})
export class LeafCountModule {}
