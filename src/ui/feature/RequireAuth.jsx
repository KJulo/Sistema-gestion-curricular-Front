import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { selectCurrentToken, selectCurrentUser, setCredentials } from "@slices/auth/authSlice";

import { useEffect } from "react";

const RequireAuth = ({ role }) => {
  const dispatch = useDispatch();
  const localData = JSON.parse(sessionStorage.getItem("sesion"));
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  useEffect(() => {
    if (localData) {
      dispatch(setCredentials(localData));
    }
  }, [localData?.data?.token]);

  return (
    <>
      {localData?.data || (token && user.type === role) ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
