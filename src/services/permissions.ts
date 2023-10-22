import { PermissionsType } from "@types"
import { httpClient } from "@utils/http-client"

export const getPermissions = async () => {
  return httpClient
    .get<PermissionsType.GetPermissionsResponseDto>("/permissions")
    .then((res) => res.data)
}
