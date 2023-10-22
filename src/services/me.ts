import { httpClient } from "@utils/http-client"
import { MeType } from "@types"

export const getMe = async () => {
  return httpClient.get<MeType.GetMeResponseDto>("/me").then((res) => res.data)
}
