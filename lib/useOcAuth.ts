import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OcRootState } from "../redux/appStore";
import { getUser, logout } from '../redux/slices/ocAuth'

let hasRetrievedUser = false;

const useOcAuth = () => {
    const dispatch = useDispatch()
    const {isAnonymous, isAuthenticated, user, loginError} = useSelector((state:OcRootState) => state.ocAuth);

    useEffect(() => {
        if (isAnonymous && !isAuthenticated) {
            dispatch(logout())
        } else if (isAuthenticated && !user && !hasRetrievedUser) {
            hasRetrievedUser = true;
            dispatch(getUser())
        }
    }, [isAnonymous, isAuthenticated, user])

    const result = useMemo(() => {
        return {
            isAnonymous,
            isAuthenticated,
            user,
            loginError,
        }
    }, [isAnonymous, isAuthenticated, user, loginError])

    return result;

}

export default useOcAuth