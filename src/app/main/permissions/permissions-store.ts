import { getPermissions } from "@src/services/permissions"
import { PermissionsType } from "@types"
import { makeObservable, observable, action, runInAction } from "mobx"

export class PermissionsStore {
  permissions: PermissionsType.PermissionDto[] = []
  isFetchingPermissions: boolean = false

  constructor() {
    makeObservable(this, {
      permissions: observable,
      isFetchingPermissions: observable,
      getPermissions: action
    })
  }

  getPermissions = async () => {
    this.isFetchingPermissions = true

    const permissions = await getPermissions()
    runInAction(() => {
      this.isFetchingPermissions = false
      this.permissions = permissions
    })
  }
}
