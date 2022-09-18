import React from "react";



//components
import { DefaultTitleContent, ContentTable, SearchContent, FilterCourse, AddCourse } from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { content, columns } from "@constants/admin/courses";

const Courses = () => {
  return (
    <div>
      <DefaultTitleContent title={"Cursos"} action={<AddCourse />} />
      <div
        style={true ? {} : { pointerEvents: "none" }}
      >
        <AdminTableLayout
          searchInput={<SearchContent placeHolder="Buscar curso" />}
          selectFilter={<FilterCourse />}
          tableContent={
            <ContentTable
              content={content}
              columns={columns}
              type="course"
            />
          }
        />
      </div>
    </div>
  );
};

export default Courses;
