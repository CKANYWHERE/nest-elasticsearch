import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { SearchDto } from './dto/search.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly searchService: ElasticsearchService) {}

  async create(createSearchDto: CreateSearchDto) {
    const parseDto = createSearchDto as any;
    const newSearch = await this.searchService.index({
      index: 'bookes',
      type: 'book',
      body: { ...parseDto },
    });
    return newSearch;
  }

  async search(search: string) {
    const { body } = await this.searchService.search({
      index: 'bookes',
      body: {
        query: {
          wildcard: {
            book_name: `*${search}*`,
          },
        },
      },
    });
    return { search: body.hits.hits };
  }
}
