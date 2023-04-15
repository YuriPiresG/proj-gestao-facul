import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MatrixService } from './matrix.service';
import { CreateMatrixDto } from './dto/create-matrix.dto';
import { UpdateMatrixDto } from './dto/update-matrix.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/users/constants/user-role.constant';

@Controller('matrix')
export class MatrixController {
  constructor(private readonly matrixService: MatrixService) {}

  @Post()
  @Roles(UserRole.COORDINATOR, UserRole.ADMIN)
  create(@Body() createMatrixDto: CreateMatrixDto) {
    return this.matrixService.create(createMatrixDto);
  }

  @Get()
  findAll() {
    return this.matrixService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.matrixService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatrixDto: UpdateMatrixDto) {
    return this.matrixService.update(+id, updateMatrixDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matrixService.remove(+id);
  }
}
