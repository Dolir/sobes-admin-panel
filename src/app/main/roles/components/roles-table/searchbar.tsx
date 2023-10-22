import Search from "antd/es/input/Search"
import { useSearchParams } from "react-router-dom"

export const SearchBar = () => {
  const [params, setParams] = useSearchParams()
  const handleSearch = (value: string) => {
    if (value) params.set("search", value)
    else params.delete("search")
    setParams(params)
  }
  return (
    <Search
      style={{ width: 250 }}
      defaultValue={params.get("search") || ""}
      onSearch={handleSearch}
      onBlur={(event) => {
        handleSearch(event.target.value)
      }}
      placeholder="Search"
    />
  )
}
