export type PaginationQueryParams<SortableType = string> = {
  page?: number
  limit?: number
  searchText?: string
  /**
   * Sort field uses string literal types from passed generic type
   *
   * This way we ensure type safety when using sort keys */
  sort?: keyof SortableType | `-${string & keyof SortableType}`
}
export type PaginationResponse<Entity> = {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  docs: Entity[]
}
