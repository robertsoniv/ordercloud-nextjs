import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Auth,
  Configuration,
  Me,
  MeUser,
  Tokens,
  UserGroups,
} from "ordercloud-javascript-sdk";

let scope = [];
let clientId = "";

if (process.env.NEXT_PUBLIC_OC_BASE_API_URL) {
  Configuration.Set({ baseApiUrl: process.env.NEXT_PUBLIC_OC_BASE_API_URL });
}

if (process.env.NEXT_PUBLIC_OC_SCOPE) {
  scope = process.env.NEXT_PUBLIC_OC_SCOPE.split(",");
}

if (process.env.NEXT_PUBLIC_OC_CLIENT_ID) {
  clientId = process.env.NEXT_PUBLIC_OC_CLIENT_ID;
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
  "ordercloud/login",
  async (credentials: LoginAction, thunkAPI) => {
    console.log("login", credentials);
    const response = await Auth.Login(
      credentials.username,
      credentials.password,
      clientId,
      scope
    );
    Tokens.SetAccessToken(response.access_token);
    if (credentials.remember && response.refresh_token) {
      Tokens.SetRefreshToken(response.refresh_token);
    }
    const user = await Me.Get();
    return { ...response, user };
  }
);

export const logout = createAsyncThunk("ordercloud/logout", async () => {
  const allowAnonymous = Boolean(process.env.NEXT_PUBLIC_OC_ALLOW_ANONYMOUS);
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
    };
  }
});

export const getUser = createAsyncThunk("ordercloud/getuser", async () => {
  const response = await Me.Get();
  return response;
});

interface OrderCloudState {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  user?: MeUser | null;
}

const initialAccessToken = Tokens.GetAccessToken();
let isAnonymous = true;
if (initialAccessToken) {
  console.log("initial hit");
  const parsed = parseJwt(initialAccessToken);
  console.log("initial parsed hit", parsed);
  isAnonymous = !!parsed.orderid;
}

const initialState: OrderCloudState = {
  isAuthenticated: !!initialAccessToken,
  isAnonymous,
};

export const orderCloudSlice = createSlice({
  name: "ordercloud",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login fulfilled");
      state.isAnonymous = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log("logout fulfilled");
      state.isAnonymous = true;
      state.isAuthenticated = !!action.payload.access_token;
      state.user = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log("retrieved user");
      state.user = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function

export default orderCloudSlice.reducer;
