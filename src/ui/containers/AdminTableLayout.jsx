import React from "react";

//antd
import { Row, Col } from "antd";

//components
// import { ContentTable } from "@components/index";
// import SkeletonTable from "../components/SkeletonTable";

const AdminTableLayout = ({ searchInput, selectFilter, tableContent }) => {
  return (
    <>
      <Row>
        <Row>
          <Col>{searchInput}</Col>
          <Col>{selectFilter}</Col>
        </Row>
      </Row>
      <div>{tableContent}</div>
    </>
  );
};

export default AdminTableLayout;
