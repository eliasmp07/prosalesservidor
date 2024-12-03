import { Injectable } from '@nestjs/common';
import { CreateDocumentsPdfDto } from './dto/create-documents-pdf.dto';
import { UpdateDocumentsPdfDto } from './dto/update-documents-pdf.dto';

@Injectable()
export class DocumentsPdfService {
  create(createDocumentsPdfDto: CreateDocumentsPdfDto) {
    return 'This action adds a new documentsPdf';
  }

  findAll() {
    return `This action returns all documentsPdf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentsPdf`;
  }

  update(id: number, updateDocumentsPdfDto: UpdateDocumentsPdfDto) {
    return `This action updates a #${id} documentsPdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentsPdf`;
  }
}
