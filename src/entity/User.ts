import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Roles } from "../enums/Roles";
import { UsersColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.USER })
export class User extends DefualtEntity {
  @Column({ name: UsersColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: UsersColumns.FIRST_NAME, nullable: false })
  firstName: string;

  @Column({ name: UsersColumns.LAST_NAME, nullable: false})
  lastName: string;

  @Column({ name: UsersColumns.EMAIL, nullable: false})
  emailAddress: string;

  @Column({ name: UsersColumns.PHONE_NUMBER, nullable: true})
  phoneNumber: string;

  @Column({ name: UsersColumns.PASSWORD_HASH, nullable: false})
  passwordHash: string;

  @Column({ name: UsersColumns.ROLE, default: Roles.NORMAL_USER})
  role: Roles;

  @Column({ name: UsersColumns.PROFILE_PICTURE_URL, nullable: true})
  profilePictureUrl: string;

  @Column({ name: UsersColumns.REFRESH_TOKEN, nullable: true})
  refreshToken: string;
  

  @Column({
    type: "boolean",
    name: UsersColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  

  initialize(firstName: string, lastName: string, emailAddress: string, phoneNumber: string, passwordHash: string ){
    const now = utcNow();
    this.uuid = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.passwordHash = passwordHash;
    this.createdAt = now;
    return this
  }
}