import React, { useEffect } from "react";

//components
import {
  DefaultTitleContent,
  ContentTable,
  SearchContent,
  AddParent,
} from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { content, columns } from "@constants/admin/parents";

//redux
import { useDispatch, useSelector } from "react-redux";
import { FETCH_PARENTS_ADMIN } from "@infrastructure/sagas/types/admin";
import { Spin } from "antd";

const Parents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_PARENTS_ADMIN });
  }, []);

  const { parents } = useSelector((store) => store.admin);
  return (
    <div>
      <DefaultTitleContent title={"Apoderados"} action={<AddParent />} />
      <div style={true ? {} : { pointerEvents: "none" }}>
        {Object.keys(parents[0]).length !== 0 ? (
          <AdminTableLayout
            tableContent={
              <ContentTable
                content={parents}
                columns={columns}
                type="Parents"
              />
            }
          />
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default Parents;
