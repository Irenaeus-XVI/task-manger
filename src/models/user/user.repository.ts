import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { AbstractRepository } from '../abstract.repository';

export class UserRepository extends AbstractRepository<User> {
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<UserDocument>,
    ) {
        super(UserModel);
    }
}
