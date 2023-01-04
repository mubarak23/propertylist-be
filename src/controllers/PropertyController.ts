import {
  Controller,
  Get,
  Query,
  Route,
  Tags,
  Request,
  Post,
  Body,
  Security,
} from 'tsoa';
import { Connection, getConnection, getRepository } from 'typeorm';
import _ from 'underscore';
import { getFreshConnection } from '../db';
import { CreatePropertyDto } from '../dto/CreatePropertyDto';
import { IPaginatedList } from '../dto/IPaginatedList';
import { PropertyDto } from '../dto/PropertyResponseDto';
import { Property } from '../entity/Property';
import { User } from '../entity/User';
import { SortOrder } from '../enums/SortOrder';
import { IServerResponse } from '../interfaces/IServerResponse';
import * as PaginationService from '../services/paginationService';
import * as PropertyService from '../services/propertyService';

@Route('/api/property')
@Tags('Property Service')
export class PropertyController extends Controller {
  @Get('/all')
  public async getProperties(
    @Request() req: any,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('sortOrder') sortOrder: SortOrder
  ): Promise<IServerResponse<IPaginatedList<PropertyDto[]>>> {
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

  @Post('/new')
  @Security('jwt')
  public async createProperty(
    @Request() req: any,
    @Body() reqBody: CreatePropertyDto
  ): Promise<IServerResponse<PropertyDto>> {
    const currentUser: User = req.user;
    const createNewProperty = await PropertyService.saveProperty(
      reqBody,
      currentUser.id
    );
    const transformProperty = await PropertyService.transformProperty(
      createNewProperty
    );
    const resData: IServerResponse<PropertyDto> = {
      status: true,
      data: transformProperty,
      message: 'New Property Added Successfully',
    };
    return resData;
  }
}
