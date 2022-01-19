import { Injectable } from '@nestjs/common';
import { RegulatorService } from 'src/power/regulator/regulator.service';

@Injectable()
export class DiskService {
  constructor(private regulatorService: RegulatorService) {}

  getData() {
    console.log('Drawing 20 watts of power');
    this.regulatorService.regulatePower(20);
    return 'data!';
  }
}
