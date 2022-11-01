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
  NotFound,
  Login,
  Recover,

  ParentsHome,
  ParentsAttendance,
  ParentsMarks,
  StudentHome,
  StudentMarks,
  StudentAttendance,
  StudentVirtualClassroom,
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
  TeacherVirtualClassroom
} from '@pages/index';

//antd
import { ConfigProvider } from 'antd';

//layout
import { MainLayout } from "@layouts/index";

// constants
import { parentsMenu, teacherMenu, studentMenu } from '@constants/menu';
import { student, teacher, parents } from '@constants/users';

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
              <Route path='*' element={<NotFound />} />
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='login' element={<Login />} />
              <Route path='recover' element={<Recover />} />

              <Route path="administrador" element={<MainLayout userType='admin' />}>
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

              <Route path="estudiante" element={<MainLayout userType='student' />}>
                <Route path='' element={<StudentHome />} />
                <Route path='asistencia' element={<StudentAttendance />} />
                <Route path='notas' element={<StudentMarks />} />
                <Route path='aula-virtual' element={<StudentVirtualClassroom />} />
                <Route path='*' element={<Navigate to='/estudiante' />} />
              </Route>

              <Route path='apoderado' element={<MainLayout userType='parent' />}>
                <Route path='' element={<ParentsHome />} />
                <Route path='asistencia' element={<ParentsAttendance />} />
                <Route path='notas' element={<ParentsMarks />} />
                <Route path='*' element={<Navigate to='/apoderado' />} />
              </Route>

              <Route path='profesor' element={<MainLayout userType='teacher' />}>
                <Route path='' element={<TeacherHome />} />
                <Route path='modulo-asistencia' element={<TeacherAttendance />} />
                <Route path='modulo-notas' element={<TeacherMarks />} />
                <Route path='modulo-aulas' element={<TeacherVirtualClassroom />} />
                <Route path='*' element={<Navigate to='/profesor' />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </>
  );
};

export default hot(App);
