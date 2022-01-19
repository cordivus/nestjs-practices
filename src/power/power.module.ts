import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { RegulatorService } from './regulator/regulator.service';

@Module({
  providers: [PowerService, RegulatorService],
  exports: [RegulatorService],
})
export class PowerModule {}
