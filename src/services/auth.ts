import { httpClient } from "@utils/http-client"
import { AuthType } from "@types"

export const login = async (data: AuthType.LoginRequestDto) => {
  return httpClient
    .post<AuthType.LoginResponseDto>("/auth/login", data)
    .then((res) => res.data)
}
export const refreshToken = async (data: AuthType.RefreshRequestDto) => {
  return httpClient
    .post<AuthType.RefreshResponseDto>("/auth/refresh-token", data)
    .then((res) => res.data)
}
