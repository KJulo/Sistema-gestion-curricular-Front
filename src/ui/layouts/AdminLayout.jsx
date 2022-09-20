import React from "react";
import "@styles/AdminLayout.less";
import { Layout, Menu, Affix, Dropdown, Avatar, Select } from "antd";
const { Option } = Select;
import { DownOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import NavigationMenu from "@components/NavigationMenu";
import SchoolLogo from "@logos/school-icon.svg";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const menuPerfil = (
    <Menu style={{marginTop:"12px"}}>
      <Menu.Item key={"logout"}>Cerrar sesión</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          boxShadow:
            "0px 9px 28px 8px rgb(0 0 0 / 5%), 0px 3px 6px -4px rgb(0 0 0 / 12%)",
          background: "white",
        }}
        onBreakpoint={(broken) => {
          //todo
        }}
        onCollapse={(collapsed, type) => {
          //todo
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ margin: "16px", height: "32px" }}
            src={SchoolLogo}
          ></img>
          <span>Colegio fuensalvida</span>
        </div>
        <NavigationMenu />
      </Sider>
      <Layout>
        <Affix offsetTop={top}>
          <Header
            style={{
              textAlignLast: "end",
              backgroundColor: "white",
              boxShadow:
                "0px 9px 28px 8px rgb(0 0 0 / 5%), 0px 3px 6px -4px rgb(0 0 0 / 12%)",
            }}
          >
            <Dropdown overlay={menuPerfil}>
              <a
                onClick={(e) => e.preventDefault()}
                style={{ color: "black", justifyItems: "baseline" }}
              >
                <Avatar size="medium" style={{ marginRight: "10px" }}>
                  {"B"}
                </Avatar>{" "}
                Bruno <DownOutlined />
              </a>
            </Dropdown>
          </Header>
        </Affix>

        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 36,
              margin: 24,
              minHeight: 360,
              borderRadius: "8px",
              border: "1px solid #e8e8e8",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
