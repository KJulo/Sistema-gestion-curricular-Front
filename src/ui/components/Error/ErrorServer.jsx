//react
import React from "react";

//antd
import { Typography, Button } from "antd";
const { Title, Text } = Typography;

//img
import Error400 from "@img/404error.jpg";

const ErrorServer = ({ error }) => {
  return (
    <div className="display-flex flex-column" style={{ margin: "100px" }}>
      <div className="display-flex flex-column" style={{ width: "50%" }}>
        <div>
          <Title style={{ color: "#262626" }}>Oops...</Title>
          <Text style={{ fontSize: "20px", color: "#595959" }}>Algo salió mal</Text>
        </div>
        <div style={{ marginTop: "8px" }}>
          <Text style={{ fontSize: "20px", color: "#595959" }}>
            Estamos resolviendo un problema, por favor intenta nuevamente más tarde.
          </Text>
        </div>
        <Text style={{ marginTop: "8px", color: "#595959", fontWeight: "600" }}>{error.error}</Text>

        <div style={{ marginTop: "22px" }}>
          <Button
            className="button-tertiary"
            onClick={() => (error.code === 404 ? location.assign("/") : location.reload())}
            style={{ width: "128px" }}>
            Actualizar
          </Button>
        </div>
      </div>
      <div className="display-flex flex-column" style={{ width: "100%", marginTop: 20 }}>
        <img src={Error400} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default ErrorServer;
