import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DefaultTitleContent } from "@components/index";

const Home = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.admin);

  return (
    <>
      <DefaultTitleContent title={"Bienvenido "+admin.nombres+" "+admin.apellidos} />
    </>
  );
};

export default Home;
