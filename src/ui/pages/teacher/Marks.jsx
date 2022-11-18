import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { fetchStudents, fetchCourses, fetchStudentsNotes, setIsLoading } from "@slices/teachers";

//components
import {
  ContentTable,
  SearchContent,
  TeacherFilterCourse,
  DefaultTitleContent,
  LoadingSpinner,
  AddMark,
  MarkForm,
} from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { getColumns } from "@constants/teacher/marksTable";
import { Modal, Form } from "antd";

const Marks = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { list: content } = useSelector((store) => store.teacher.students);
  const {
    activeFilters,
    isLoading,
    courses: { list: courses },
  } = useSelector((store) => store.teacher);

  const onClickEdit = (record) => {
    setSelectedMark(record.selectedMark);
    setIsModalVisible(true);
    console.log(record);
  };

  const [selectedMark, setSelectedMark] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentsFiltered, setStudentsFiltered] = useState(content);
  const [tableColumns, setTableColumns] = useState(getColumns(content, onClickEdit));
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStudents());
    dispatch(fetchStudentsNotes());
  }, []);

  // Update
  useEffect(() => {
    const courseFiltered = courses.find((c) => c.id === activeFilters.courseId);
    const newStudents = content?.filter((c) => c.curso.id === activeFilters.courseId);
    setStudentsFiltered(newStudents);
    setTableColumns(getColumns(newStudents, onClickEdit));
    setSelectedCourse(courseFiltered);
  }, [activeFilters.courseId, content]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Form data
  const handleOk = (values) => {
    setIsModalVisible(false);
    console.log(values);
    // if (hasAllConditions(filters)) {
    //   const params = {
    //     markInformation: values,
    //     courseInformation: filters,
    //   };
    //   dispatch(addMarks(params));
    // }
    form.resetFields();
  };

  return (
    <div>
      <DefaultTitleContent
        title={"Módulo Notas"}
        subtitle="En este módulo podrás ver y añadir las notas de tus alumnos."
      />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <LoadingSpinner isLoading={isLoading}>
          <AdminTableLayout
            filters={[
              <TeacherFilterCourse courses={courses} includeDate={false} />,
              <AddMark
                course={selectedCourse}
                students={studentsFiltered}
                filters={activeFilters}
              />,
            ]}
            tableContent={
              <ContentTable content={studentsFiltered} columns={tableColumns} scroll={false} />
            }
          />

          {selectedMark && (
            <Modal
              title={`Editar nota de ${selectedMark.nombre}`}
              visible={isModalVisible}
              onOk={form.submit}
              onCancel={handleCancel}
              width={300}>
              <MarkForm form={form} mark={selectedMark} handleOk={handleOk} />
            </Modal>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default Marks;
