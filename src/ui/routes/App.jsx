//react-hotloader
import { hot } from 'react-hot-loader/root';

//react
import React from 'react';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import store from '@redux';

//pages
import {
  StudentHome,
  StudentMarks,
  StudentAttendance,
  TeacherAttendance,
  TeacherHome,
  TeacherMarks,

  AdminHome,
  AdminStudents,
  AdminParents,
  AdminTeachers,
  AdminCourses,

  AdminViewStudent,
  AdminViewParent,
  AdminViewTeacher,
  AdminViewCourse,
} from '@pages/index';

//antd
import { ConfigProvider } from 'antd';

//layout
import { AdminLayout } from "@layouts/index";

//locale
import 'moment/locale/es-us';
import locale from 'antd/es/locale/es_ES';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ConfigProvider locale={locale}>
          <BrowserRouter>
            <Routes>
              <Route path="administrador" element={<AdminLayout />}>
                <Route path="" element={<AdminHome />} />

                <Route path="alumnos" element={<AdminStudents />} />
                <Route path="alumnos/:id" element={<AdminViewStudent />} />

                <Route path="profesores" element={<AdminTeachers />} />
                <Route path="profesores/:id" element={<AdminViewTeacher />} />

                <Route path="apoderados" element={<AdminParents />} />
                <Route path="apoderados/:id" element={<AdminViewParent />} />

                <Route path="cursos" element={<AdminCourses />} />
                <Route path="cursos/:id" element={<AdminViewCourse />} />
                
                <Route path="*" element={<Navigate to="/administrador" />} />
              </Route>
              <Route path='/' element={<Navigate to='/estudiante' />} />
              <Route path='/estudiante' element={<StudentHome />} />
              <Route path='/estudiante/asistencia' element={<StudentAttendance />} />
              <Route path='/estudiante/notas' element={<StudentMarks />} />
              <Route path='/profesor' element={<TeacherHome />} />
              <Route path='/profesor/modulo-asistencia' element={<TeacherAttendance />} />
              <Route path='/profesor/modulo-notas' element={<TeacherMarks />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </>
  );
};

export default hot(App);
