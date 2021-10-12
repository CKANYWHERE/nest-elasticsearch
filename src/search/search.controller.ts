import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { SearchDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get()
  async getSearch(@Body() searchDto: SearchDto) {
    return await this.searchService.search(searchDto.key);
  }

  @Post()
  async insertSearch(@Body() createSearchDto: CreateSearchDto) {
    return await this.searchService.create(createSearchDto);
  }
}
