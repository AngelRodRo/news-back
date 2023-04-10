import { Inject, Service } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { NewsModel } from '../models/News';

type SearchByTextResult = {
  news: NewsModel[] | null;
  totalCount: number;
}

@Service()
export class NewsService {
  constructor(@Inject(NewsModel) private newsModel: MongooseModel<NewsModel>) {}

  async searchByText(text: string, pageSize: number = 10, pageNumber: number = 1): Promise<SearchByTextResult> {
    const query = {
      $text: {
        $search: text,
      },
    }
    const totalCount = await this.newsModel.countDocuments(query);

    const news = await this.newsModel.find(query)
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize)
      .exec();
    return {
      news,
      totalCount,
    };
  }

}