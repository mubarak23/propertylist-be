import { Types } from '../enums/Types';

export interface CreatePropertyDto {
  name: string;
  description: string;
  type: Types;
}
