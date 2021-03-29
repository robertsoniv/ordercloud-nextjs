import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { logout } from "./slices/ocAuth";

export function withOcErrorHandler<Returned = any, Args = undefined>(
  payloadCreator: AsyncThunkPayloadCreator<Returned, Args>
) {
  return async (args: Args, thunkAPI: any) => {
    try {
      return await payloadCreator(args, thunkAPI);
    } catch (err) {
      /**
       * Here is where you can add handlers for specific errors
       * that occur in async thunk actions. As you can see, by
       * default we dispatch the logout() ocAuth action when we
       * get a 401 unauthorized.
       *
       * TODO: This may have to change once refresh tokens are
       * working again, as the SDK should automatically attempt
       * a refresh when this occurs.
       */
      if (err.isOrderCloudError) {
        if (err.status === 401) {
          thunkAPI.dispatch(logout());
        }
      }
      throw err;
    }
  };
}
