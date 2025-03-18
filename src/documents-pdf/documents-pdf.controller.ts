import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentsPdfService } from './documents-pdf.service';
import { CreateDocumentsPdfDto } from './dto/create-documents-pdf.dto';
import { UpdateDocumentsPdfDto } from './dto/update-documents-pdf.dto';

@Controller('documents-pdf')
export class DocumentsPdfController {
  constructor(private readonly documentsPdfService: DocumentsPdfService) {}

  @Post()
  create(@Body() createDocumentsPdfDto: CreateDocumentsPdfDto) {
    return this.documentsPdfService.create(createDocumentsPdfDto);
  }

  @Get()
  findAll() {
    return this.documentsPdfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsPdfService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentsPdfDto: UpdateDocumentsPdfDto,
  ) {
    return this.documentsPdfService.update(+id, updateDocumentsPdfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsPdfService.remove(+id);
  }
}
