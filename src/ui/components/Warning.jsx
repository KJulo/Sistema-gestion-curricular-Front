import { Tooltip } from 'antd'
import React from 'react'
import { WarningFilled } from "@ant-design/icons";

const warning = ({text}) => {
  return (
    <Tooltip title={text}>
      <WarningFilled style={{color:"#fadb14"}} />
    </Tooltip>
  )
}

export default warning