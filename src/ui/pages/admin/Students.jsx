import React, { useEffect } from "react";

//components
import {
  DefaultTitleContent,
  ContentTable,
  SearchContent,
  AddStudent,
} from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { columns } from "@constants/admin/students";

//redux
import { useDispatch, useSelector } from "react-redux";

//actions
import { FETCH_STUDENTS_ADMIN } from "@infrastructure/sagas/types/admin";
import { Spin } from "antd";

const Students = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_STUDENTS_ADMIN });
  }, []);

  const { students, isFetching } = useSelector((store) => store.admin);

  return (
    <div>
      <DefaultTitleContent title={"Alumnos"} action={<AddStudent />} />
      <div style={true ? {} : { pointerEvents: "none" }}>
        {!isFetching ? (
          <AdminTableLayout
            tableContent={
              <ContentTable
                content={students}
                columns={columns}
                scroll={false}
              />
            }
          />
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default Students;
