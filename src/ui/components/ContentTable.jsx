//react
import React from 'react'

//antd
import { Table } from 'antd'

import "@styles/ContentTable.less"

const ContentTable = ({ content, columns, type }) => {
  if (type == 'scroll') {
    return (
      <Table
        columns={columns}
        dataSource={content}
        style={{ tableLayout: "fixed" }}
        rowKey="id"
        pagination={{
          position: ['none'],
        }}
        scroll={{
          x: 1300,
        }}
      />
    )
  } else {
    return (
      <Table
        columns={columns}
        dataSource={content}
        style={{ tableLayout: "fixed" }}
        rowKey="id"
        pagination={{
          position: ['none'],
        }}
      />
    )
  }
}

export default ContentTable