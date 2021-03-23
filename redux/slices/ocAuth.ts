import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Auth,
  Configuration,
  Me,
  MeUser,
  Tokens,
} from "ordercloud-javascript-sdk";
import { withOcErrorHandler } from "../withOcErrorHandler";
import { cleanCatalogCache } from "./ocCatalog";

/**
 * ORDERCLOUD CLIENT ID
 * Use this environment variable to control what scope should be requested when
 * authenticating with OrderCloud (both anonymous and registered user)
 */

let clientId = "";
if (process.env.NEXT_PUBLIC_OC_CLIENT_ID) {
  clientId = process.env.NEXT_PUBLIC_OC_CLIENT_ID;
}

/**
 * ORDERCLOUD SCOPE
 * Use this environment variable to control what scope should be requested when
 * authenticating with OrderCloud (both anonymous and registered user). It should be
 * a comma delimited string
 */

let scope = [];
if (process.env.NEXT_PUBLIC_OC_SCOPE) {
  scope = process.env.NEXT_PUBLIC_OC_SCOPE.split(",");
}

/**
 * ORDERCLOUD BASE URL OVERRIDE
 * Use this to override the base OrderCloud API url to be used in the javascript SDK.
 * Make sure the environment base url for the organization you are using matches the
 * base URL provided in your environment variables. If you want to use production, you
 * can leave this field out.
 */
if (process.env.NEXT_PUBLIC_OC_BASE_API_URL) {
  Configuration.Set({ baseApiUrl: process.env.NEXT_PUBLIC_OC_BASE_API_URL });
}

function parseJwt(token?: string) {
  if (!token) return {};
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

interface LoginAction {
  username: string;
  password: string;
  remember?: boolean;
}

export const login = createAsyncThunk(
  "ocAuth/login",
  withOcErrorHandler(async (credentials: LoginAction, thunkAPI) => {
    const cs = thunkAPI.getState();
    console.log(cs, thunkAPI);
    const response = await Auth.Login(
      credentials.username,
      credentials.password,
      clientId,
      scope
    );
    thunkAPI.dispatch(cleanCatalogCache());
    Tokens.SetAccessToken(response.access_token);
    if (credentials.remember && response.refresh_token) {
      Tokens.SetRefreshToken(response.refresh_token);
    }
    const user = await Me.Get();
    return { ...response, user };
  })
);

export const logout = createAsyncThunk(
  "ocAuth/logout",
  withOcErrorHandler<any>(async (_, thunkAPI) => {
    const allowAnonymous = Boolean(process.env.NEXT_PUBLIC_OC_ALLOW_ANONYMOUS);
    console.log("hit", allowAnonymous);
    thunkAPI.dispatch(cleanCatalogCache());
    if (allowAnonymous) {
      const response = await Auth.Anonymous(clientId, scope);
      Tokens.SetAccessToken(response.access_token);
      Tokens.SetRefreshToken(response.refresh_token);
      const user = await Me.Get();
      const result = { ...response, user };
      return result;
    } else {
      Tokens.RemoveAccessToken();
      Tokens.RemoveRefreshToken();
      return {
        access_token: undefined,
        user: null,
      };
    }
  })
);

export const getUser = createAsyncThunk(
  "ocAuth/getuser",
  withOcErrorHandler<MeUser>(async (_, thunkAPI) => {
    const response = await Me.Get();
    return response;
  })
);

interface OcAuthState {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  user?: MeUser | null;
  loginError?: string | null;
}

const initialAccessToken = Tokens.GetAccessToken();
let isAnonymous = true;

if (initialAccessToken) {
  const parsed = parseJwt(initialAccessToken);
  isAnonymous = !!parsed.orderid;
}

const initialState: OcAuthState = {
  isAuthenticated: !!initialAccessToken,
  isAnonymous,
};

const ocAuthSlice = createSlice({
  name: "ocAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAnonymous = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginError = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAnonymous = true;
      state.isAuthenticated = !!action.payload.access_token;
      state.user = action.payload.user;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function

export default ocAuthSlice.reducer;
