import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { logout } from "./slices/ocAuth";

export function withOcErrorHandler<Returned = any, Args = undefined>(
  payloadCreator: AsyncThunkPayloadCreator<Returned, Args>
) {
  return async (args: Args, thunkAPI: any) => {
    try {
      return await payloadCreator(args, thunkAPI);
    } catch (err) {
      console.log(args, thunkAPI);
      if (err.isOrderCloudError) {
        if (err.status === 401) {
          thunkAPI.dispatch(logout());
        }
      }
      throw err;
    }
  };
}
