import React, { useEffect } from "react";

//components
import {
  DefaultTitleContent,
  ContentTable,
  SearchContent,
  FilterCourse,
  AddCourse,
} from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { content, columns } from "@constants/admin/courses";

//redux
import { useDispatch, useSelector } from "react-redux";
import { FETCH_COURSES_ADMIN } from "@infrastructure/sagas/types/admin";

const Courses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_COURSES_ADMIN });
  }, []);

  const { courses } = useSelector((store) => store.admin);
  
  return (
    <div>
      <DefaultTitleContent title={"Cursos"} action={<AddCourse />} />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          searchInput={<SearchContent placeHolder="Buscar curso" />}
          //selectFilter={<FilterCourse />}
          tableContent={
            <ContentTable content={courses} columns={columns} type="course" />
          }
        />
      </div>
    </div>
  );
};

export default Courses;
