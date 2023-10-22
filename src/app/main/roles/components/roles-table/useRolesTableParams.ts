import { useEffect, useState } from "react"
import type { TablePaginationConfig } from "antd/es/table"
import type { SorterResult } from "antd/es/table/interface"
import { useSearchParams } from "react-router-dom"
import { RolesType } from "@types"
import { useStore } from "@src/app/store"

interface TableParams {
  pagination?: TablePaginationConfig
  sort?: keyof RolesType.RoleDto
  search?: string
}

const defaultPagination = {
  page: 1,
  limit: 10
} as const
export const useRolesTableParams = () => {
  const { rolesStore } = useStore()
  const [params, setParams] = useSearchParams()
  const page = params.get("page")
  const limit = params.get("limit")
  const sort = params.get("sort") as keyof RolesType.RoleDto
  const search = params.get("search") || undefined

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: Number(page) || defaultPagination.page,
      pageSize: Number(limit) || defaultPagination.limit,
      showSizeChanger: true
    },
    sort,
    search
  })

  useEffect(() => {
    if (tableParams.pagination?.pageSize && tableParams.pagination?.current) {
      params.set("page", tableParams.pagination?.current.toString())
      params.set("limit", tableParams.pagination?.pageSize.toString())

      if (tableParams.sort) params.set("sort", tableParams.sort)

      setParams(params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params,
    setParams,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams.sort
  ])
  useEffect(() => {
    setTableParams((prev) => ({ ...prev, search }))
  }, [search])

  useEffect(() => {
    if (!page || !limit) {
      params.set("page", defaultPagination.page.toString())
      params.set("limit", defaultPagination.limit.toString())
      setParams(params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, setParams])

  useEffect(() => {
    rolesStore
      .fetchRoles({
        limit: tableParams.pagination?.pageSize,
        page: tableParams.pagination?.current,
        searchText: tableParams.search,
        sort: tableParams.sort
      })
      .then((res) => {
        setTableParams((prev) => ({
          ...prev,
          pagination: { ...prev.pagination, total: res.totalDocs }
        }))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    rolesStore,
    tableParams.pagination?.pageSize,
    tableParams.pagination?.current,
    tableParams.search,
    tableParams.sort
  ])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<RolesType.RoleDto>
  ) => {
    const sortKey = (() => {
      if (!sorter.order) return
      let key = sorter.columnKey
      if (sorter.order === "descend") key = "-" + key
      return key as keyof RolesType.RoleDto
    })()

    setTableParams({ pagination, sort: sortKey })
  }
  return { tableParams, handleTableChange }
}
