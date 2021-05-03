import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthenticationProvider } from './auth.interface';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(details: Omit<User, 'id'>) {
    const user = await this.userModel.create(details);

    return await user.save();
  }

  async findUser(discordId: string) {
    return await this.userModel.findOne({ discordId });
  }

  async validateUser(details: Omit<User, 'id'>) {
    const { discordId } = details;

    const user = await this.findUser(discordId);

    if (user) return user;

    return await this.createUser(details);
  }
}
