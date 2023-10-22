export type PermissionCodeType =
  | "GET_ADMIN_USERS"
  | "CREATE_ADMIN_USER"
  | "UPDATE_ADMIN_USER"
  | "CHANGE_ADMIN_USER_PASSWORD"
  | "DELETE_ADMIN_USER"
  | "GET_PERMISSIONS"
  | "GET_ROLES"
  | "CREATE_ROLE"
  | "UPDATE_ROLE"
  | "DELETE_ROLE"
  | "GET_ORGANIZATIONS"
  | "CREATE_ORGANIZATIONS"
  | "UPDATE_ORGANIZATION"
  | "DELETE_ORGANIZATION"

export type PermissionDto = {
  name: string
  code: PermissionCodeType
}
export type GetPermissionsResponseDto = PermissionDto[]
