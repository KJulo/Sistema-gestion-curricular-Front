import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchTeacher } from "@slices/teachers";
import { fetchParent } from "@slices/parents";
import { fetchStudent } from "@slices/students";
import { fetchAdmin } from "@slices/admin";

import { Layout, Affix } from "antd";
import SchoolLogo from "@logos/school-icon.svg";
import "@styles/MainLayout.less";

import {
  AdminMenu,
  TeacherMenu,
  StudentMenu,
  ParentsMenu,
  HandleError,
  UserDropdown,
} from "@components/index";

const { Header, Content, Sider } = Layout;

const SiderMenu = ({ userType }) => {
  if (userType === "admin") return <AdminMenu />;
  if (userType === "teacher") return <TeacherMenu />;
  if (userType === "student") return <StudentMenu />;
  if (userType === "parent") return <ParentsMenu />;
};

const MainLayout = ({ userType }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) {
      if (userType === "admin") dispatch(fetchAdmin(user));
      if (userType === "teacher") dispatch(fetchTeacher(user));
      if (userType === "student") dispatch(fetchStudent(user));
      if (userType === "parent") dispatch(fetchParent(user));
    }
  }, [user]);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          boxShadow: "0px 9px 28px 8px rgb(0 0 0 / 5%), 0px 3px 6px -4px rgb(0 0 0 / 12%)",
          background: "white",
        }}
        onBreakpoint={(broken) => {
          //todo
        }}
        onCollapse={(collapsed, type) => {
          //todo
        }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img style={{ margin: "16px", height: "32px" }} src={SchoolLogo}></img>
          <span>Colegio fuensalvida</span>
        </div>

        <SiderMenu userType={userType} />
      </Sider>
      <Layout>
        <Affix offsetTop={top}>
          <Header
            style={{
              textAlignLast: "end",
              backgroundColor: "white",
              boxShadow: "0px 9px 28px 8px rgb(0 0 0 / 5%), 0px 3px 6px -4px rgb(0 0 0 / 12%)",
            }}
            className="site-page-header-responsive">
            <UserDropdown user={user} />
          </Header>
        </Affix>

        <Content
          style={{
            margin: "24px 16px 0",
          }}>
          <div
            className="site-layout-background"
            style={{
              padding: 40,
              margin: 10,
              minHeight: 360,
              borderRadius: "8px",
              border: "1px solid #e8e8e8",
            }}>
            <HandleError>
              <Outlet />
            </HandleError>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
