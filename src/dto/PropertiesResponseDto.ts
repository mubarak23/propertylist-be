import { Types } from '../enums/Types';
import { SimpleImageJson } from '../interfaces/SimpleImageJson';

export interface PropertiesDto {
  userId: number;
  name: string;
  description: string;
  contact?: string;
  type: Types;
  amenities?: string[];
  pictures: SimpleImageJson;
}
