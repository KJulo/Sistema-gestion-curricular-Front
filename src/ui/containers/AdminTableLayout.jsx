import React from "react";

//antd
import { Row, Col } from "antd";

const AdminTableLayout = ({ searchInput, selectFilter, tableContent, extraFilter }) => {

  const allSpan2 = searchInput === '' ? 18 : 14;

  return (
    <div>
      <Row style={{ display: "flex", justifyContent:"space-between" }}>
        <Col span={8} >{searchInput}</Col>
        <Col span={allSpan2} >{selectFilter}</Col>
        {extraFilter ?? (
          <Col>
            {extraFilter}
          </Col>
        )}
      </Row>


      <div
        style={{
          padding: "20px",
          marginTop: "30px",
          borderRadius: "8px",
          border: "1px solid rgb(232, 232, 232)",
        }}
      >
        {tableContent}
      </div>
      
    </div>
  );
};

export default AdminTableLayout;
