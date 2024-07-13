import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { AbstractRepository } from '../abstract.repository';

export class TaskRepository extends AbstractRepository<Task> {
    constructor(
        @InjectModel(Task.name)
        private readonly taskModel: Model<TaskDocument>,
    ) {
        super(taskModel);
    }
}
