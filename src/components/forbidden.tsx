import { Flex, Typography } from "antd"

export const Forbidden = () => {
  return (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      <Typography.Title level={4}>
        You don't have access to this page
      </Typography.Title>
    </Flex>
  )
}
