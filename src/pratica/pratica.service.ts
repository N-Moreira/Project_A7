import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pratica, PraticaDocument } from './schema/pratica.schema';

@Injectable()
export class PraticaService {

  constructor(
    @InjectModel(Pratica.name)
    private praticaModel: Model<PraticaDocument>,
  ) {}

  async criar(pratica: any) {
    const novaPratica = new this.praticaModel(pratica);

    return await novaPratica.save();
  }

  async listar(filtros: any) {

  const query: any = {};

  if (filtros.nomeUsuario) {
    query.nomeUsuario = filtros.nomeUsuario;
  }

  if (filtros.tipo) {
    query.tipo = filtros.tipo;
  }

  if (filtros.dataInicial || filtros.dataFinal) {

    query.data = {};

    if (filtros.dataInicial) {
      query.data.$gte = filtros.dataInicial;
    }

    if (filtros.dataFinal) {
      query.data.$lte = filtros.dataFinal;
    }
  }

  return await this.praticaModel.find(query);
}

async estatisticas() {

  const praticas = await this.praticaModel.find();

  const totalGeral = praticas.length;

  const totalPorTipo: any = {};
  const totalPorUsuario: any = {};

  praticas.forEach((pratica) => {

    if (totalPorTipo[pratica.tipo]) {
      totalPorTipo[pratica.tipo]++;
    } else {
      totalPorTipo[pratica.tipo] = 1;
    }

    if (totalPorUsuario[pratica.nomeUsuario]) {
      totalPorUsuario[pratica.nomeUsuario]++;
    } else {
      totalPorUsuario[pratica.nomeUsuario] = 1;
    }

  });

  let tipoMaisRegistrado = '';
  let maiorTipo = 0;

  for (const tipo in totalPorTipo) {

    if (totalPorTipo[tipo] > maiorTipo) {
      maiorTipo = totalPorTipo[tipo];
      tipoMaisRegistrado = tipo;
    }
  }

  let usuarioMaisAtivo = '';
  let maiorUsuario = 0;

  for (const usuario in totalPorUsuario) {

    if (totalPorUsuario[usuario] > maiorUsuario) {
      maiorUsuario = totalPorUsuario[usuario];
      usuarioMaisAtivo = usuario;
    }
  }

  const mediaDiaria = totalGeral / 30;

  return {
    tipoMaisRegistrado,
    usuarioMaisAtivo,
    totalPorTipo,
    totalGeral,
    mediaDiaria,
  };
}

  async deletar(id: string) {

  return await this.praticaModel.findByIdAndDelete(id);
}


}