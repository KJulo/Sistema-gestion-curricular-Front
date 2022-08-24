//react-hotloader
import { hot } from "react-hot-loader/root";

//react
import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";


//pages
import {
  StudentHome,
  TeacherHome
} from "@pages/index";

//antd
import { ConfigProvider } from "antd";

//locale
import "moment/locale/es-us";
import locale from "antd/es/locale/es_ES";

const App = () => {
  return (
    <>
        <ConfigProvider locale={locale}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Navigate to="/student" /> } />
                  <Route path="/student" element={<StudentHome />} />
                  <Route path="/teacher" element={<TeacherHome />} />
                </Routes>
              </BrowserRouter>
        </ConfigProvider>
    </>
  );
};

export default hot(App);
