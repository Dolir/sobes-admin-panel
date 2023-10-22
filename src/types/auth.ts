export type TokensType = { access_token: string; refresh_token: string }

export type LoginRequestDto = { username: string; password: string }
export type LoginResponseDto = TokensType

export type RefreshRequestDto = { refresh_token: string }
export type RefreshResponseDto = TokensType
