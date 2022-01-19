import { Injectable } from '@nestjs/common';
import { PowerService } from '../power.service';

@Injectable()
export class RegulatorService {
  constructor(private powerService: PowerService) {}

  regulatePower(watts: number) {
    return this.powerService.supplyPower(watts);
  }
}
