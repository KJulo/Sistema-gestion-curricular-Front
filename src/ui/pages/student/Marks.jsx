import React, { useState, useEffect } from "react";
import "@styles/Marks.less";

// antd
import { Statistic } from "antd";

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from "@hooks/useDate";
import { useAverage } from "@hooks/useAverage";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, fetchMarks, updateFilters } from "@slices/students";

//components
import { ContentTable, DefaultTitleContent, LoadingSpinner } from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { columns } from "@constants/student/marksTable";

const Marks = () => {
  const dispatch = useDispatch();
  const { student, isLoading, marks } = useSelector((store) => store.student);

  // Recuperar data
  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(fetchMarks(student));
  }, [student]);

  return (
    <div>
      <DefaultTitleContent
        title={"Notas"}
        subtitle="Aquí podrás revisar tu promedio y notas que llevas hasta el momento."
      />

      <LoadingSpinner isLoading={isLoading}>
        {student.hasOwnProperty("nombres") ? (
          <Statistic
            title={student.nombres.split(" ")[0] + " " + student.apellidos[0]}
            value={
              "Promedio: " +
              (useAverage(marks, 2) === "NaN" ? "Sin notas aún" : useAverage(marks, 2))
            }
          />
        ) : (
          <></>
        )}
      </LoadingSpinner>

      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          tableContent={<ContentTable content={marks} columns={columns} scroll={false} />}
        />
      </div>
    </div>
  );
};

export default Marks;
