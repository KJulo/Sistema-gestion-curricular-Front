//react
import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

//pages
import ErrorServer from "@components/Error/ErrorServer";
import { useLocation } from "react-router-dom";

//styles
import "@styles/Error.less";

const HandleError = ({ children }) => {
  const error = useSelector((store) => store.error);
  const dispatch = useDispatch();

  switch (true) {
    case error && error.code !== 200 && error.code !== 0:
      return <ErrorServer error={error} />;
    default:
      return <>{children}</>;
  }
};

export default HandleError;
