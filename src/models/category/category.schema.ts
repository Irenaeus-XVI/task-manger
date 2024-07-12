import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
    timestamps: true,
})
export class Category {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean;

    readonly _id?: mongoose.Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
