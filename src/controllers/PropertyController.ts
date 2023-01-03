import { Controller, Get, Query, Route, Tags, Request } from 'tsoa';
import { Connection, getConnection, getRepository } from 'typeorm';
import _ from 'underscore';
import { IPaginatedList } from '../dto/IPaginatedList';
import { PropertiesDto } from '../dto/PropertiesResponseDto';
import { Property } from '../entity/Property';
import { SortOrder } from '../enums/SortOrder';
import { IServerResponse } from '../interfaces/IServerResponse';
import * as PaginationService from '../services/paginationService';

@Route('/api/property')
@Tags('Property Service')
export class PropertyController extends Controller {
  @Get('/all')
  public async getProperties(
    @Request() req: any,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('sortOrder') sortOrder: SortOrder
  ): Promise<IServerResponse<IPaginatedList<PropertiesDto[]>>> {
    const query: any = {
      isSoftDeleted: false,
    };
    const join = {};

    const propertyPage: IPaginatedList<Property> =
      (await PaginationService.paginate(
        Property,
        query,
        pageSize,
        pageNumber,
        sortOrder,
        undefined,
        join
      )) as IPaginatedList<Property>;
    const properties: Property[] = propertyPage.dataset;
    const propertyRepo = getRepository(Property);
    const total = await propertyRepo.count(query);

    const transformProperties = properties.map((item) => {
      return {
        name: item.name,
        description: item.description,
        contact: item.contact,
        type: item.type,
        amenities: item.amenities,
        pictures: item.pictures,
      };
    });
    const resData: IServerResponse<any> = {
      status: true,
      data: {
        pageNumber,
        total,
        pageSize,
        dataset: _.shuffle(transformProperties),
      },
    };
    return resData;
  }
}
