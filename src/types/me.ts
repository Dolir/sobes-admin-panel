import { RolesType } from "@types"

export type MeDto = {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  username: string
  roleId: string
  role: RolesType.RoleDto
}

export type GetMeResponseDto = MeDto
