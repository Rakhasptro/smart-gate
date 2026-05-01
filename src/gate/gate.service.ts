import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GateService {
  constructor(private prisma: PrismaService) {}

  async handleScan(uid: string) {
    // 1. Cari kartu RFID
    const card = await this.prisma.rFIDCard.findUnique({
      where: { uid },
      include: { user: true },
    });

    // 2. Jika tidak ditemukan
    if (!card) {
      return {
        access: false,
        message: 'Kartu tidak terdaftar',
      };
    }

    // 3. Jika nonaktif
    if (card.status !== 'AKTIF') {
      return {
        access: false,
        message: 'Kartu tidak aktif',
      };
    }

    // 4. Simpan log (akses diterima)
    await this.prisma.gateLog.create({
      data: {
        status: 'MASUK',
        rfidId: card.id,
      },
    });

    // 5. Return sukses
    return {
      access: true,
      message: `Selamat datang ${card.user.name}`,
    };
  }
}