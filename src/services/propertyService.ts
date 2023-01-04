import { getRepository } from 'typeorm';
import { CreatePropertyDto } from '../dto/CreatePropertyDto';
import { PropertyDto } from '../dto/PropertyResponseDto';
import { Property } from '../entity/Property';

export const saveProperty = async (
  newPropery: CreatePropertyDto,
  userId: number
): Promise<Property> => {
  const propertyRepo = getRepository(Property);
  const newPro = new Property().initialize(
    userId,
    newPropery.name,
    newPropery.description,
    newPropery.type
  );
  const saveProperty = await propertyRepo.save(newPro);
  return saveProperty;
};

export const transformProperty = async (property): Promise<PropertyDto> => {
  const transformProper = property.map((item: Property) => {
    return {
      name: item.name,
      description: item.name,
      contact: item.contact,
      type: item.type,
      amenities: item.amenities,
      pictures: item.pictures,
    };
  });
  return transformProper;
};
