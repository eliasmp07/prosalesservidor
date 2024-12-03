import { Module } from '@nestjs/common';
import { DocumentsPdfService } from './documents-pdf.service';
import { DocumentsPdfController } from './documents-pdf.controller';

@Module({
  controllers: [DocumentsPdfController],
  providers: [DocumentsPdfService],
})
export class DocumentsPdfModule {}
