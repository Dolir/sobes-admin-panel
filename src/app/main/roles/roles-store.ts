import {
  createRole,
  deleteRole,
  getRoles,
  updateRole
} from "@src/services/roles"
import { RolesType } from "@types"
import { makeObservable, observable, action, runInAction } from "mobx"

export class RoleStore {
  roles: RolesType.RoleDto[] = []
  isFetchingRoles: boolean = false
  filterData = {}
  constructor() {
    makeObservable(this, {
      roles: observable,
      isFetchingRoles: observable,
      createRole: action,
      deleteRole: action,
      updateRole: action,
      fetchRoles: action,
      clearData: action
    })
  }

  createRole = async (data: RolesType.CreateRoleRequestDto) => {
    const newRole = await createRole(data)
    await this.fetchRoles(this.filterData)
    return newRole
  }

  updateRole = async (data: RolesType.UpdateRoleRequestDto) => {
    const newRole = await updateRole(data)
    await this.fetchRoles(this.filterData)
    return newRole
  }

  deleteRole = async (id: string) => {
    await deleteRole({ id })
    runInAction(() => {
      this.roles = this.roles.filter((role) => role.id !== id)
    })
  }

  fetchRoles = async (
    filterData: RolesType.GetRolesRequestDto,
    saveFilterData: boolean = true
  ) => {
    this.isFetchingRoles = true

    if (saveFilterData) this.filterData = filterData
    const roles = await getRoles(filterData)

    runInAction(() => {
      this.isFetchingRoles = false
      this.roles = roles.docs
    })
    return roles
  }

  clearData = () => {
    this.roles = []
  }
}
