import { Injectable } from '@nestjs/common';
import{User} from './user.model'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async createUser(user: User){
        const userModel = new this.userModel(
            {
                nome: user.name,
                tipo: user.tipo,
                data: user.date,
                descricao: user.descricao
            }
        );
        const result = await userModel.save();
        return result.id as string;
    }

    async readUser(){
        const user = await this.userModel.find().exec();
        return user;
    }
}

