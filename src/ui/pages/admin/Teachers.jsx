import React, { useEffect } from "react";

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

//actions
import { FETCH_TEACHERS_ADMIN } from "@infrastructure/sagas/types/admin";
import { Spin } from "antd";

const Teachers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_TEACHERS_ADMIN });
  }, []);

  const { teachers, isFetching } = useSelector((store) => store.admin);

  return (
    <div>
      <DefaultTitleContent
        title={"Profesores"}
        action={<AddTeacher></AddTeacher>}
      />
      {!isFetching ? (
        <div style={true ? {} : { pointerEvents: "none" }}>
          <AdminTableLayout
            tableContent={
              <ContentTable
                content={teachers}
                columns={columns}
                scroll={false}
              />
            }
          />
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Teachers;
