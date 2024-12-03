import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentsPdfDto } from './create-documents-pdf.dto';

export class UpdateDocumentsPdfDto extends PartialType(CreateDocumentsPdfDto) {}
