import React from "react";

//antd
import { Row, Col, Space } from "antd";

const AdminTableLayout = ({ tableContent, searchInput, filters }) => {
  return (
    <div>
      <Space direction="horizontal">
        <Row justify="start" gutter={16}>
          {searchInput ? <Col>{searchInput}</Col> : <></>}
          {filters ? filters.map((component) => <Col>{component}</Col>) : <></>}
        </Row>
      </Space>

      <div
        style={{
          padding: "20px",
          marginTop: "30px",
          borderRadius: "8px",
          border: "1px solid rgb(232, 232, 232)",
        }}>
        {tableContent}
      </div>
    </div>
  );
};

export default AdminTableLayout;
