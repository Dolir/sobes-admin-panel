import { RolesType } from "@types"
import { httpClient } from "@utils/http-client"

export const getRoles = async (params: RolesType.GetRolesRequestDto) => {
  return httpClient
    .get<RolesType.GetRolesResponseDto>("/roles", { params })
    .then((res) => res.data)
}
export const createRole = async (data: RolesType.CreateRoleRequestDto) => {
  return httpClient
    .post<RolesType.CreateRoleResponseDto>("/roles", data)
    .then((res) => res.data)
}
export const updateRole = async ({
  id,
  ...data
}: RolesType.UpdateRoleRequestDto) => {
  return httpClient
    .put<RolesType.UpdateRoleResponseDto>(`/roles/${id}`, data)
    .then((res) => res.data)
}
export const deleteRole = async ({ id }: RolesType.DeleteRoleRequestDto) => {
  return httpClient.delete<RolesType.DeleteRoleResponseDto>(`/roles/${id}`)
}
