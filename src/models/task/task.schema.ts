import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { TaskType } from 'src/common/constants/type.constants';

export type TaskDocument = Task & Document;

@Schema({
    timestamps: true,
})
export class Task {

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, enum: TaskType, required: true })
    type: string;

    @Prop({ type: String, required: false })
    body?: string;

    @Prop({ type: [String], required: false })
    listItems?: string[];

    @Prop({ type: Boolean, required: true, default: false })
    shared: boolean

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: false })
    category: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: false })
    user: Types.ObjectId;

    @Prop({ type: Boolean, default: false })
    isDeleted?: boolean;
    readonly _id?: mongoose.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
