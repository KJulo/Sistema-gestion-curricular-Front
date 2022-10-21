import React from 'react'

//components
import { DefaultTitleContent, ContentTable, SearchContent, AddStudent } from '@components/index'

//containers
import { AdminTableLayout } from '@containers/index'

//constants
import { content, columns } from '@constants/admin/students'

//redux
import { useDispatch, useSelector } from "react-redux";
import { FETCH_STUDENTS_ADMIN } from "@infrastructure/sagas/types/admin";

const Students = () => {
  const dispatch = useDispatch();
  dispatch({ type: FETCH_STUDENTS_ADMIN})
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