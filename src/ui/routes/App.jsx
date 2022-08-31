//react-hotloader
import { hot } from "react-hot-loader/root";

//react
import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "@redux";

//pages
import { StudentHome, TeacherHome, AdminHome } from "@pages/index";

//antd
import { ConfigProvider } from "antd";

//locale
import "moment/locale/es-us";
import locale from "antd/es/locale/es_ES";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ConfigProvider locale={locale}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/estudiante" />} />
              <Route path="/estudiante" element={<StudentHome />} />
              <Route path="/profesor" element={<TeacherHome />} />
              <Route path="/administrador" element={<AdminHome />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </>
  );
};

export default hot(App);
