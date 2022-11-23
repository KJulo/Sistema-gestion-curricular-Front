import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import {
  fetchStudents,
  fetchCourses,
  fetchStudentsNotes,
  updateMark,
  deleteMark,
} from "@slices/teachers";

//components
import {
  ContentTable,
  SearchContent,
  FilterCourse,
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
  const { list: students } = useSelector((store) => store.teacher.students);
  const {
    activeFilters,
    isLoading,
    courses: { list: courses },
  } = useSelector((store) => store.teacher);

  const onClickEdit = (record) => {
    setSelectedMark(record.selectedMark);
    setIsModalVisible(true);
  };

  const [selectedMark, setSelectedMark] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentsFiltered, setStudentsFiltered] = useState(students);
  const [tableColumns, setTableColumns] = useState(getColumns(students, onClickEdit));
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStudents());
    dispatch(fetchStudentsNotes());
  }, []);

  // Update
  useEffect(() => {
    if (courses && courses.length > 0) {
      const courseFiltered = courses.find((c) => c.id === activeFilters.courseId);
      setSelectedCourse(courseFiltered);
    }
    if (students && students.length > 0) {
      const newStudents = students?.filter((c) => c.curso?.id === activeFilters.courseId);
      setStudentsFiltered(newStudents);
      setTableColumns(getColumns(newStudents, onClickEdit));
    }
  }, [activeFilters.courseId, students]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Form data
  const handleOk = (values) => {
    setIsModalVisible(false);
    const ponderacion = values.ponderacion / 100;
    const payload = {
      id: selectedMark.id,
      id_alumno: selectedMark.id_alumno,
      descripcion: values.nota.toString(),
      id_asignatura: selectedMark.id_asignatura,
      nombre: selectedMark.nombre,
      nota: values.nota.toString(),
      ponderacion: ponderacion.toString(),
      fecha: selectedMark.fecha,
    };
    dispatch(updateMark(payload));
    form.resetFields();
  };

  const onDelete = () => {
    setIsModalVisible(false);
    dispatch(deleteMark(selectedMark));
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
              <FilterCourse courses={courses} includeDate={false} />,
              <AddMark
                course={selectedCourse}
                students={studentsFiltered}
                filters={activeFilters}
              />,
            ]}
            tableContent={
              <ContentTable content={studentsFiltered} columns={tableColumns} scroll={1600} />
            }
          />

          {selectedMark && (
            <Modal
              title={`Editar nota de ${selectedMark.nombre}`}
              visible={isModalVisible}
              onOk={form.submit}
              onCancel={handleCancel}
              width={300}
              footer={null}>
              <MarkForm
                form={form}
                mark={selectedMark}
                handleOk={handleOk}
                onDelete={onDelete}
                onCancel={handleCancel}
              />
            </Modal>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default Marks;
