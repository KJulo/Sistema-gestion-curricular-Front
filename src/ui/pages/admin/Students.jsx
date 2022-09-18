import React from 'react'

//components
import { DefaultTitleContent, ContentTable, SearchContent, AddStudent } from '@components/index'

//containers
import { AdminTableLayout } from '@containers/index'

//constants
import { content, columns } from '@constants/admin/teachers'

const Students = () => {
  return (
    <div>
      <DefaultTitleContent title={"Alumnos"} action={<AddStudent />} />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          searchInput={<SearchContent placeHolder="Buscar alumno" />}
          tableContent={<ContentTable content={content} columns={columns} type="students" />}
        />
      </div>
    </div>
  )
}

export default Students