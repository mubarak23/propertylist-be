

export enum ShortUrlColumns {
  UUID = "uuid",
  UNIQUE_CODE = "unique_code",
  LONG_URL = "long_url",
  SHORT_URL = "short_url",
  IS_SOFT_DELETED = "is_soft_delete"
}


export enum UsersColumns {
  UUID = "uuid",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  PHONE_NUMBER = 'phone_number',
  PASSWORD_HASH = "passwordHash",
  PROFILE_PICTURE_URL = "profilePictureUrl",
  REFRESH_TOKEN = "refreshToken",
  ROLE = "role",
  IS_SOFT_DELETED = "isSoftDeleted"
}



export const TableColumns: any = {
  ID: "id",
  IS_ENABLED: "is_enabled",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export default TableColumns;
