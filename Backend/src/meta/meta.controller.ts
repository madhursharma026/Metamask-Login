import { MetaService } from './meta.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';

@Controller('meta')
export class MetaController {

  constructor(private readonly metaService: MetaService) {}

  @Get('/:metamaskId')
  getSingleUser(@Param('metamaskId') metamaskId: string) {
    return this.metaService.getSingleUser(metamaskId);
  }

  @Post('/edit_details')
  edit_details(@Body() body: any) {
    return this.metaService.edit_details(body.fullName, body.emailAddress, body.metamaskId);
  }
}