import { Empty, Flex } from "antd"

export const MockPage = ({ description }: { description: string }) => {
  return (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      <Empty description={description} />
    </Flex>
  )
}
