import React from "react";
import { useDispatch } from "react-redux";
import useOcAuth from "../lib/useOcAuth";
import { login, logout } from "../redux/slices/ocAuth";

export default function Auth() {
  const {isAnonymous} = useOcAuth()
  const dispatch = useDispatch();

  return (
    <div className="p-4">
        {isAnonymous ? (

        <button
          className="text-red-500 hover:bg-red-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          aria-label="Increment value"
          onClick={() => dispatch(login({
            username: 'buyer02',
            password: 'password1234',
            remember: true,
          }))}
        >
          Login
        </button>
        ) : (
        <button
          className="text-red-500 hover:bg-red-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          aria-label="Increment value"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>

        )}
      </div>
  );
}
