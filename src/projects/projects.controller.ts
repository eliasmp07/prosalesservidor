import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteProjectDto } from './dto/delete_project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get('findProjectById/:id')
  findAll(@Param('id') id: number) {
    return this.projectsService.findAllByCustomerId(id);
  }

  @Get('findProjectByUserId/:id')
  findProjectByUserId(@Param('id') id: number) {
    return this.projectsService.findAllByUserId(id);
  }

  @Post('closeProject/:id')
  closeProject(@Param('id') id: number) {
    return this.projectsService.completeProject(id);
  }

  @Delete('delete/:id')
  deleteProject(
    @Param('id') id: number,
    @Body() deleteProject: DeleteProjectDto,
  ) {
    this.projectsService.cancelProject(id, deleteProject);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
