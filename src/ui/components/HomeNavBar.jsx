import React, { useState } from "react";
import "@styles/NavBar.less";

// hooks
import { useFormatToURL } from "@hooks/useFormatText";

// utils
import { randomNumberInRange } from "@utils/random";

// antd
import { Button, Drawer, Anchor, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Link } = Anchor;
const { Title } = Typography;

const randomUser = ["profesor", "estudiante", "apoderado"];

const HomeNavBar = ({ toppics, user }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  function getUser() {
    return (
      <div style={{ textAlign: "center", margin: "10px 0 50px 0" }}>
        <Avatar shape="square" size={120} icon={<UserOutlined />} />
        <Title level={3} style={{ marginTop: 20 }}>
          {user.nombres} {user.apellidos}
        </Title>
      </div>
    );
  }

  return (
    <div style={{ margin: 40 }}>
      <div className="mobileVisible">
        <Button type="primary" onClick={showDrawer}>
          <span>Ver Módulos</span>
        </Button>
        <Drawer title="Módulos" placement="left" onClose={onClose} visible={visible}>
          {getUser()}
          <Anchor targetOffset="65">
            {toppics.map((toppic, index) =>
              toppic == "Inicio" ? (
                <Link href={"/" + user.tipo + "/"} title={toppic} key={index} />
              ) : (
                <Link
                  href={"/" + user.tipo + "/" + useFormatToURL(toppic)}
                  title={toppic}
                  key={index}
                />
              )
            )}
          </Anchor>
        </Drawer>
      </div>
      <div className="mobileHidden">
        {getUser()}
        <Anchor targetOffset="65">
          {toppics.map((toppic, index) =>
            toppic == "Inicio" ? (
              <Link href={"/" + user.tipo + "/"} title={toppic} key={index} />
            ) : (
              <Link
                href={"/" + user.tipo + "/" + useFormatToURL(toppic)}
                title={toppic}
                key={index}
              />
            )
          )}
          <br />
          <br />
          {/* <Link 
            href={'/' + user.tipo + '/' + useFormatToURL('#')}
            title='Cerrar Sesión'
          /> */}
          <Link href={"/" + randomUser[randomNumberInRange(0, 2)] + "/"} title="Cerrar Sesión" />
        </Anchor>
      </div>
    </div>
  );
};

export default HomeNavBar;
