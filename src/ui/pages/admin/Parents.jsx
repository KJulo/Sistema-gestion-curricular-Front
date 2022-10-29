import React from "react";

//components
import { DefaultTitleContent, ContentTable, SearchContent, AddParent } from "@components/index";

//containers
import { AdminTableLayout } from "@containers/index";

//constants
import { content, columns } from "@constants/admin/parents";

const Parents = () => {
  return (
    <div>
      <DefaultTitleContent title={"Apoderados"} action={<AddParent />} />
      <div style={true ? {} : { pointerEvents: "none" }}>
        <AdminTableLayout
          searchInput={<SearchContent placeHolder="Buscar apoderado" />}
          tableContent={<ContentTable content={content} columns={columns} scroll={false} />}
        />
      </div>
    </div>
  );
};

export default Parents;
