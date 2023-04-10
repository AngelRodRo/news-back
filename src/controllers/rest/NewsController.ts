import {UseBefore} from "@tsed/platform-middlewares";
import {Controller} from "@tsed/di";
import {Get, Header, Property, Returns} from "@tsed/schema";
import {QueryParams} from '@tsed/platform-params';
import {BadRequest, InternalServerError} from "@tsed/exceptions";

import {AuthMiddleware} from "../../middlewares/AuthMiddleware";

import {NewsService} from "../../services/NewsService";

@UseBefore(AuthMiddleware)
@Controller("/news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get("/search")
  @Header({
    "x-rapidapi-key": "",
    "x-rapidapi-host": ""
  })
  @Returns(200)
  @Returns(BadRequest.STATUS, String).Description("Query is required")
  @Returns(InternalServerError.STATUS, String).Description("String")
  async search(
    @QueryParams('q') query: string = '', 
    @QueryParams('pageNumber') page: number = 1, 
    @QueryParams('pageSize') size: number = 10
  ) {
    try {
      if (!query) {
        throw new BadRequest('Query is required');
      }
      const { news = [], totalCount = 0 } = await this.newsService.searchByText(query, size, page);
      return {
        value: news,
        totalCount,
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerError(error.message)
    }
  }
}
