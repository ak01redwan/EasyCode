import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfirmationsService } from './confirmations.service';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { UpdateConfirmationDto } from './dto/update-confirmation.dto';

@Controller('confirmations')
export class ConfirmationsController {
  constructor(private readonly confirmationsService: ConfirmationsService) {}

  @Post()
  create(@Body() createConfirmationDto: CreateConfirmationDto) {
    //this.confirmationsService.create(createConfirmationDto);
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConfirmationDto: UpdateConfirmationDto) {
    return await this.confirmationsService.update(+id, updateConfirmationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
