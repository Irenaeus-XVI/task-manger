import mongoose from 'mongoose';

export class Category {
  readonly _id?: mongoose.Types.ObjectId;
  name: string;
  user: mongoose.Types.ObjectId;
  isDeleted?: boolean;
}


