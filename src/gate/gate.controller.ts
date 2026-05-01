import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GateService } from './gate.service';
import { ScanDto } from './dto/scan.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('gate')
export class GateController {
  constructor(private readonly gateService: GateService) {}

  @UseGuards(JwtAuthGuard)
  @Post('scan')
  async scan(@Body() dto: ScanDto) {
    return this.gateService.handleScan(dto.uid);
  }
}