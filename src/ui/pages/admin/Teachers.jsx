import React from "react";

//components
import {
  DefaultTitleContent,
  ContentTable,
  SearchContent,
  AddTeacher,
} from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { columns } from "@constants/admin/teachers";

//redux
import { useDispatch, useSelector } from "react-redux";
import { FETCH_TEACHERS_ADMIN } from "@infrastructure/sagas/types/admin";
import { useEffect } from "react";

const Teachers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_TEACHERS_ADMIN });
  }, []);

  const { teachers } = useSelector((store) => store.admin);
  
  return (
    <div>
      <DefaultTitleContent
        title={"Profesores"}
        action={<AddTeacher></AddTeacher>}
      />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          //searchInput={<SearchContent placeHolder="Buscar profesor" />}
          tableContent={
            <ContentTable content={teachers} columns={columns} type="teachers" />
          }
        />
      </div>
    </div>
  );
};

export default Teachers;
