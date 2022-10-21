import React from "react";

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

const Parents = () => {
  const dispatch = useDispatch();
  dispatch({ type: FETCH_PARENTS_ADMIN });
  return (
    <div>
      <DefaultTitleContent title={"Apoderados"} action={<AddParent />} />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          searchInput={<SearchContent placeHolder="Buscar apoderado" />}
          tableContent={
            <ContentTable content={content} columns={columns} type="Parents" />
          }
        />
      </div>
    </div>
  );
};

export default Parents;
