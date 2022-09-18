//react
import React from 'react'

//antd
import { Table } from 'antd'

const ContentTable = ({ content, columns, type }) => {
  console.log("columnas", columns);
  console.log("datos", content);
  return (
    <Table
      columns={columns}
      dataSource={content}
    />
  )
}

export default ContentTable