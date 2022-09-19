//react
import React from 'react'

//antd
import { Table } from 'antd'

import "@styles/ContentTable.less"

const ContentTable = ({ content, columns, type }) => {
  console.log("columnas", columns);
  console.log("datos", content);
  return (
    <Table
      columns={columns}
      dataSource={content}
      style={{tableLayout:"fixed"}}
    />
  )
}

export default ContentTable