import { makeObservable, observable, action } from "mobx"
import { accessTokenKey, refreshTokenKey } from "@src/utils/http-client"
import { AuthType, MeType } from "@types"
import { login, refreshToken } from "@src/services/auth"
import { getMe } from "@src/services/me"

export class AuthStore {
  isAuthenticated = true
  currentUser: MeType.MeDto | null = null

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      currentUser: observable,
      login: action,
      logout: action
    })
  }
  setTokens(data: AuthType.TokensType) {
    localStorage.setItem(accessTokenKey, data.access_token)
    localStorage.setItem(refreshTokenKey, data.refresh_token)

    this.isAuthenticated = true
  }

  async login(data: AuthType.LoginRequestDto) {
    const res = await login(data)
    this.setTokens(res)
  }

  async refreshToken(data: AuthType.RefreshRequestDto) {
    return refreshToken(data)
      .then((res) => {
        this.setTokens(res)
        return res
      })
      .catch(() => {
        //If refresh token is invalid, logout
        this.logout()
        return null
      })
  }

  async verifyToken() {
    const refreshToken = localStorage.getItem(refreshTokenKey)
    const accessToken = localStorage.getItem(accessTokenKey)

    const refresh = () =>
      this.refreshToken({
        refresh_token: refreshToken!
      }).then((res) => {
        if (res) getUserMe()

        return res
      })

    const getUserMe = () =>
      getMe()
        .then((res) => {
          this.currentUser = res
          return true
        })
        .catch(() => false)

    //If we have no access token before check
    if (!accessToken) {
      //if we have refresh token, then refresh
      if (refreshToken) {
        return await refresh()
      }
      this.logout()
      return false
    }

    //Check access token
    const result = await getUserMe()

    //If access token is invalid but we have refresh token, then refresh
    if (refreshToken && !result) {
      return await refresh()
    }
    if (result) return true
    this.logout()
    return false
  }

  logout() {
    localStorage.removeItem(accessTokenKey)
    localStorage.removeItem(refreshTokenKey)
    this.isAuthenticated = false
    this.currentUser = null
  }
}
