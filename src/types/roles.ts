import { PaginationType, PermissionsType } from "."

export type RoleBaseDto = {
  name: string
  description: string
  permissions: PermissionsType.PermissionCodeType[]
}
export interface RoleDto extends RoleBaseDto {
  id: string
  createdAt: string
  updatedAt: string
}

export type GetRolesRequestDto = PaginationType.PaginationQueryParams<RoleDto>
export type GetRolesResponseDto = PaginationType.PaginationResponse<RoleDto>

export type CreateRoleRequestDto = RoleBaseDto
export type CreateRoleResponseDto = RoleDto

export type UpdateRoleRequestDto = { id: string } & RoleBaseDto
export type UpdateRoleResponseDto = RoleDto

export type DeleteRoleRequestDto = { id: string }
export type DeleteRoleResponseDto = void
