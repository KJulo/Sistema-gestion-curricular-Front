import React from "react";

//antd
import { Row, Col } from "antd";

//components
// import { ContentTable } from "@components/index";
// import SkeletonTable from "../components/SkeletonTable";

const AdminTableLayout = ({ searchInput, selectFilter, tableContent }) => {
  return (
    <>
      <Row style={{ display: "flex", justifyContent:"space-between" }}>
        <Col span={8} >{searchInput}</Col>
        <Col span={14} >{selectFilter}</Col>
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
    </>
  );
};

export default AdminTableLayout;
