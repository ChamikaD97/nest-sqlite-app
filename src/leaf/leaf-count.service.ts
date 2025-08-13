import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeafCount } from './leaf-count.entity';
import { log } from 'console';

@Injectable()
export class LeafCountService {
    constructor(
        @InjectRepository(LeafCount)
        private readonly repo: Repository<LeafCount>,
    ) { }

    async createOrUpdate(data: Partial<LeafCount>) {
        const existing = await this.repo.findOne({
            where: { year: data.year, month: data.month, lineCode: data.lineCode },
        });

        if (existing) {
            existing.B = this.averagePercent(existing.B, data.B);
            existing.BB = this.averagePercent(existing.BB, data.BB);
            existing.P = this.averagePercent(existing.P, data.P);

            return this.repo.save(existing);
        } else {
            return this.repo.save(this.repo.create(data));
        }
    }

    async delete(lineCode: string, month: number, year: number) {
log(`Deleting entry for ${lineCode} (${month}/${year})`);
        const entry = await this.repo.findOne({ where: { lineCode, month, year } });
        if (!entry) throw new Error('Entry not found');
        return this.repo.remove(entry);
    }
    // ✅ Helper: safely average two % values and keep within 0–100 range
    private averagePercent(oldVal?: number, newVal?: number): number {
        const valid = (v: unknown): v is number =>
            typeof v === 'number' && !isNaN(v) && v >= 0 && v <= 100;

        const o = valid(oldVal) ? oldVal : undefined;
        const n = valid(newVal) ? newVal : undefined;

        if (o !== undefined && n !== undefined) {
            return parseFloat(((o + n) / 2).toFixed(0));
        } else if (n !== undefined) {
            return n;
        } else if (o !== undefined) {
            return o;
        } else {
            return 0;
        }
    }


    async findOne(lineCode: string, month: number, year: number): Promise<LeafCount> {
        const record = await this.repo.findOne({
            where: { lineCode, month, year },
        });

        if (!record) {
            throw new Error(`No record found for ${lineCode} (${month}/${year})`);
        }

        return record;
    }


    findAll(): Promise<LeafCount[]> {
        return this.repo.find();
    }

    findByMonthYear(month: number, year: number): Promise<LeafCount[]> {
        return this.repo.find({ where: { month, year } });
    }

}
