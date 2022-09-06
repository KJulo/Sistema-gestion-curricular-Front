import React from "react";

import { TableLayout } from "@containers/index";

//redux
import { useDispatch, useSelector } from "@layouts/index";

import { content, columns } from "@constants/admin/courses";

const Courses = () => {
  return (
    <div className="contacts">
      <DefaultTitleContent title={"Cursos"} />
      <div
        className="contacts__content-table"
        style={isLoaded ? {} : { pointerEvents: "none" }}
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
