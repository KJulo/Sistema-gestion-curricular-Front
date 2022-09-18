import React from 'react'

//components
import { DefaultTitleContent, ContentTable, SearchContent, AddTeacher } from '@components/index'

//containers
import { AdminTableLayout } from '@containers/index'

//constants
import { content, columns } from '@constants/admin/teachers'

const Teachers = () => {
  return (
    <div>
      <DefaultTitleContent title={"Profesores"} action={<AddTeacher></AddTeacher>} />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          searchInput={<SearchContent placeHolder="Buscar profesor" />}
          tableContent={<ContentTable content={content} columns={columns} type="teachers" />}
        />
      </div>
    </div>
  )
}

export default Teachers