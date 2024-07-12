import { isArray, isEmpty, isNil } from 'lodash';
import {
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  ProjectionType,
  QueryOptions,
} from 'mongoose';
import { SortOrder } from 'src/common/constants/sorting.constant';
import { GetAll } from 'src/common/type';

export abstract class AbstractRepository<T> {
  private repo: Model<T & Document>;

  constructor(private nModel: Model<T & Document>) {
    this.repo = nModel;
  }

  get model() {
    return this.repo;
  }

  private _buildQuery(func, params) {
    if (isNil(params)) return func;

    const { fields, lean, populate } = params;

    if (!isNil(fields)) func.select(fields);
    if (!isNil(lean)) func.lean();

    if (populate) {
      for (let i = 0; i < populate.length; i += 1) {
        if (isArray(populate[i])) {
          func.populate(...populate[i]);
        } else {
          func.populate(populate[i]);
        }
      }
    }

    return func;
  }

  public create(item: T): Promise<T> {
    const newDocument = new this.nModel(item);
    return newDocument.save();
  }

  public async getAll(
    query: any,
    params: GetAll = { limit: 25, page: 1, paginate: true },
  ) {
    const { limit = 25, page = 1, paginate = true, sort, order, search } = params || {};
    const skip = (page - 1) * limit;
    let nResult = this._buildQuery(this.repo.find(query || {}), params);


    if (search) {
      nResult = nResult.where({
        $or: [
          { name: { $regex: new RegExp(search, 'i') } },
          { 'translation.name': { $regex: new RegExp(search, 'i') } },
          { title: { $regex: new RegExp(search, 'i') } },
          { 'translation.title': { $regex: new RegExp(search, 'i') } },
        ]
      });
    }



    if (paginate) {
      nResult.skip(skip);
      nResult.limit(limit);
    }

    if (sort) {
      nResult.sort({ [sort]: order });
    }

    let result = await nResult.exec();

    if (paginate) {
      const count = isEmpty(query)
        ? await this.model.collection.countDocuments({})
        : await this.model.countDocuments(query);

      const pages = Math.ceil(count / limit) || 1;
      result = {
        data: result,
        currentPage: skip === 0 ? 1 : Math.ceil(skip / limit) + 1,
        numberOfPages: pages,
        numberOfRecords: count,
      };
    }

    return result;
  }

  public getOne(
    query: FilterQuery<T>,
    params?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.repo.findOne(query, params, options).lean().exec();
  }

  public update(query: FilterQuery<T>, item: any, params: QueryOptions) {
    return this.repo.findOneAndUpdate(query, item, params).lean();
  }

  public async exists(query): Promise<boolean> {
    const exists = await this.model.findOne(query).lean().exec();
    return !isNil(exists);
  }

  public async aggregate(
    pipeline: PipelineStage[],
    params?: {
      limit?: number;
      page?: number;
      paginate?: boolean;
      sort?: string;
      order?: string;
    },
  ): Promise<any> {
    const { limit = 10, page = 1, paginate, sort, order } = params ?? {};
    const skip = limit * (page - 1);
    const sortValue =
      sort && order
        ? { [sort]: order === SortOrder.ASCENDING ? 1 : -1 }
        : ({ createdAt: -1 } as any);

    const countPipeline = paginate
      ? [...pipeline, { $count: 'count' }]
      : pipeline;
    const [countResult, aggregationResult] = await Promise.all([
      this.model.aggregate(countPipeline).exec(),
      this.model
        .aggregate([
          ...pipeline,
          {
            $facet: {
              [this.model.collection.name]: [
                { $skip: skip },
                { $limit: limit },
                { $sort: sortValue },
              ],
            },
          },
        ])
        .exec(),
    ]);
    const count = countResult?.shift()?.count ?? 0;

    const pages = Math.ceil(count / limit);

    const result: {
      data: any[];
      numberOfRecords?: number;
      numberOfPages?: number;
      currentPage?: number;
    } = {
      data: aggregationResult?.shift()?.[this.model.collection.name] ?? [],
    };

    if (paginate) {
      result.numberOfRecords = count;
      result.numberOfPages = pages;
      result.currentPage = skip === 0 ? 1 : Math.ceil(skip / limit + 1);
    }

    return result;
  }


  
}
