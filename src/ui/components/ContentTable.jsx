//react
import React from 'react'

//antd
import { Table } from 'antd'

import "@styles/ContentTable.less"

const ContentTable = ({ content, columns, type }) => {
  return (
    <Table
      columns={columns}
      dataSource={content}
      style={{tableLayout:"fixed"}}
      pagination={{
        position: ['none'],
      }}
    />
  )
}

export default ContentTable