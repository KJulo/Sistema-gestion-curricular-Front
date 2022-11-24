import React, { useState, useEffect } from "react";
import "@styles/Marks.less";

// antd
import { Col, Divider, Row, Space, Statistic } from "antd";

// hooks
import { useGetCurrentMonth, useGetCurrentYear, useGetCurrentDay } from "@hooks/useDate";
import { useAverage, useAverageBySubject } from "@hooks/useAverage";

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

  // Obtener nombres de las asignaturas
  const testNames = new Set();
  marks?.map((mark) => testNames.add(mark.asignatura));

  // Recuperar data
  useEffect(() => {
    dispatch(fetchMarks(student));
  }, [student]);

  function getAverage(marks) {
    return useAverage(marks, 2) === "NaN" ? "Sin notas aún" : useAverage(marks, 2);
  }

  return (
    <div>
      <DefaultTitleContent
        title={"Notas"}
        subtitle="Aquí podrás revisar tu promedio y notas que llevas hasta el momento."
      />

      <LoadingSpinner isLoading={isLoading}>
        {student.hasOwnProperty("nombres") ? (
          <>
            <Statistic
              title={student.nombres + " " + student.apellidos}
              value={"Promedio: " + getAverage(marks)}
              style={{ width: "fit-content", margin: 0 }}
            />
            <Divider />
            <Row gutter={16}>
              {Array.from(testNames).length > 0 ? (
                Array.from(testNames).map((test) => (
                  <Col>
                    <Statistic
                      title={test}
                      value={useAverageBySubject(marks, test, 2)}
                      style={{ width: "fit-content", margin: 0 }}
                    />
                  </Col>
                ))
              ) : (
                <></>
              )}
            </Row>
          </>
        ) : (
          <></>
        )}

        <div style={true ? {} : { pointerEvents: "none" }}>
          <AdminTableLayout
            tableContent={<ContentTable content={marks} columns={columns} scroll={700} />}
          />
        </div>
      </LoadingSpinner>
    </div>
  );
};

export default Marks;
