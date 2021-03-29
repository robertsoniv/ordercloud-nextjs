import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OcRootState } from "../redux/appStore";
import { getUser, logout } from "../redux/slices/ocAuth";

/**
 * This variable will stop multiple Me.Get() calls from occuring
 * upon first page load. It's a little sloppy, but it works for now.
 */
let hasRetrievedUser = false;

const useOcAuth = () => {
  const dispatch = useDispatch();
  const { isAnonymous, isAuthenticated, user, loginError } = useSelector(
    (state: OcRootState) => state.ocAuth
  );

  useEffect(() => {
    if (isAnonymous && !isAuthenticated) {
      /**
       * This seems counter intuitive, but the ocAuth logout() action
       * will automatically authenticate anonymously if the application
       * allows it.
       */
      dispatch(logout());
    } else if (isAuthenticated && !user && !hasRetrievedUser) {
      /**
       * Avoids retrieving the user on first page load.
       */
      hasRetrievedUser = true;
      dispatch(getUser());
    }
  }, [isAnonymous, isAuthenticated, user]);

  const result = useMemo(() => {
    return {
      isAnonymous,
      isAuthenticated,
      user,
      loginError,
    };
  }, [isAnonymous, isAuthenticated, user, loginError]);

  return result;
};

export default useOcAuth;
