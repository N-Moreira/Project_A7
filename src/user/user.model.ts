import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  tipo: { type: String, required: true},
  date: { type: String, required: true},
  descricao: {type: String}
})

export interface User extends mongoose.Document{
  id: string;
  name: string;
  tipo: string;
  date: string;
  descricao: string;}