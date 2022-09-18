import React from "react";
import { DefaultTitleContent } from "@components/index";
import AdminTableLayout from "@containers/AdminTableLayout";

const ViewCourse = () => {
  const cursoExample = {
    key: "24",
    name: "Lenguaje - Cuarto medio",
    anho: "2020",
  };
  return (
    <>
      <DefaultTitleContent title={cursoExample.name} action={ `Año: ${cursoExample.anho}`} />
      
    </>
  );
};

export default ViewCourse;
