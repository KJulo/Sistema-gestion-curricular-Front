//react
import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

//pages
import ErrorServer from "@components/Error/ErrorServer";
import { useLocation } from "react-router-dom";

//styles
import '@styles/Error.less';


const NotFound = () => {
  return <ErrorServer error={{ code: 404  }}/>
};

export default NotFound;