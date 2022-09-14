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
  TeacherVirtualClassroom
} from '@pages/index';

//antd
import { ConfigProvider } from 'antd';

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
              <Route path='/' element={<Navigate to='/estudiante' />} />
              <Route path='/estudiante' element={<StudentHome />} />
              <Route path='/estudiante/asistencia' element={<StudentAttendance />} />
              <Route path='/estudiante/notas' element={<StudentMarks />} />
              <Route path='/estudiante/aula-virtual' element={<StudentVirtualClassroom />} />

              <Route path='/apoderado' element={<ParentsHome />} />
              <Route path='/apoderado/asistencia' element={<ParentsAttendance />} />
              <Route path='/apoderado/notas' element={<ParentsMarks />} />

              <Route path='/profesor' element={<TeacherHome />} />
              <Route path='/profesor/modulo-asistencia' element={<TeacherAttendance />} />
              <Route path='/profesor/modulo-notas' element={<TeacherMarks />} />
              <Route path='/profesor/modulo-aulas' element={<TeacherVirtualClassroom />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </>
  );
};

export default hot(App);
