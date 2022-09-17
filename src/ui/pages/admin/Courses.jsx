import React from "react";

import { TableLayout } from "@containers/index";

//components
import { DefaultTitleContent, ContentTable, SearchContent, FilterCourse } from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";



import { content, columns } from "@constants/admin/courses";

const Courses = () => {
  return (
    <div className="contacts">
      <DefaultTitleContent title={"Cursos"} />
      <div
        className="contacts__content-table"
        style={true ? {} : { pointerEvents: "none" }}
      >
        <AdminTableLayout
          searchInput={<SearchContent placeHolder="Buscar curso" />}
          selectFilter={<FilterCourse />}
          tableContent={
            <ContentTable
              content={content}
              column={columns}
              type="course"
            />
          }
        />
      </div>
    </div>
  );
};

export default Courses;
