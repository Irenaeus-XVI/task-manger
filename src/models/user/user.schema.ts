import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: String, default: '' })
    password: string;


    readonly _id?: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
