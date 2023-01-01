import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../entity/User";
import { Roles } from "../enums/Roles";

export class adminUser1672605593595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const countryLongName = 'Nigeria'
        const countryIso2Code = 'NG'
    
        const passwordHash = '$2b$10$IL/b/u0oQJhKjmTjxK2WfuF1ydku2/ojQK9rX1Q2egDSQ/ca7ApPW'
    
        const user: User = new User().initialize('PropertyList', 'Admin',
          'admin@gmail.com', '00000000000', passwordHash, )    
        user.role = Roles.ADMIN
    
        const userRepoT = getRepository(User)  
        await userRepoT.save(user)
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepo = getRepository(User)
        await userRepo.delete({phoneNumber: '00000000000'})
      }
    }

