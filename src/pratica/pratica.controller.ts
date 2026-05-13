import {Body, Controller, Get, Post, Query, Delete, Param } from '@nestjs/common';
import { PraticaService } from './pratica.service';

@Controller()
export class PraticaController {

  constructor(
    private readonly praticaService: PraticaService,
  ) {}

  @Post('pratica')
  async criar(@Body() body: any) {

    return await this.praticaService.criar(body);
  }

  @Get('historico')
  async listar(
    @Query('nomeUsuario') nomeUsuario?: string,
    @Query('tipo') tipo?: string,
    @Query('dataInicial') dataInicial?: string,
    @Query('dataFinal') dataFinal?: string,
  ) {

    return await this.praticaService.listar({
      nomeUsuario,
      tipo,
      dataInicial,
      dataFinal,
    });
  }

  @Get('estatisticas')
  async estatisticas() {

    return await this.praticaService.estatisticas();
  }

  @Delete('pratica/:id')
async deletar(@Param('id') id: string) {

  return await this.praticaService.deletar(id);
}


}