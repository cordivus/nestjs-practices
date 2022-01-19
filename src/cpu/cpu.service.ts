import { Injectable } from '@nestjs/common';
import { RegulatorService } from 'src/power/regulator/regulator.service';

@Injectable()
export class CpuService {
  constructor(private regulatorService: RegulatorService) {}

  compute(a: number, b: number) {
    console.log('DraWing 10 watts of power');
    this.regulatorService.regulatePower(10);
    return a + b;
  }
}
