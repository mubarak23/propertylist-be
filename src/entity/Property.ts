import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Types } from "../enums/Types";
import TableColumns, { PropertyColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";
import { User } from "./User";


@Entity({ name: Tables.PROPERTIES })
export class Property extends DefualtEntity {
  @Column({ name: PropertyColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: PropertyColumns.USER_ID, nullable: true })
  userId: number;


  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: PropertyColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  user: User;

  @Column({ name: PropertyColumns.NAME, nullable: false })
  name: string;

  @Column({ name: PropertyColumns.DESCRIPTION, nullable: false})
  description: string;

  @Column({ name: PropertyColumns.CONTACT, nullable: true})
  contact: string;

  @Column({ name: PropertyColumns.TYPE, nullable: false})
  type: Types;

  @Column({ type: "jsonb", name: PropertyColumns.AMENITIES, nullable: true})
  amenities: string[];

  @Column({ type: "jsonb", name: PropertyColumns.PICTURES, nullable: true})
  pictures: SimpleImageJson;

  @Column({
    type: "boolean",
    name: PropertyColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;
  
  initialize(userId: number, name: string, description: string, type: Types ){
    const now = utcNow();
    this.uuid = uuidv4();
    this.userId = userId
    this.name = name;
    this.description = description;
    this.type = type;
    this.createdAt = now;
    return this
  }
}