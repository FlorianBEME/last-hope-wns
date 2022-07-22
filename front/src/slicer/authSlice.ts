import { createSlice } from "@reduxjs/toolkit";

type TypeState = {
  user: User;
  token: String | null;
};

type User = {
  roles: "ROLE_ADMIN" | "ROLE_DEVELOPER" | "ROLE_PROJECT_MANAGER" | "";
  id: string | null;
  firstname: string;
  mail: string;
  lastname: string;
};

const initialState: TypeState = {
  token: null,
  user: {
    roles: "",
    id: null,
    firstname: "",
    lastname: "",
    mail: "",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    AUTHENTICATE_USER_IN_STORE: (state, action) => {
      state.user = { ...action.payload.user };
      state.token = action.payload.token;
    },
    LOGOUT_USER: (state) => {
      state.user = {
        roles: "",
        id: "",
        firstname: "",
        lastname: "",
        mail: "",
      };
      state.token = null;
    },
  },
});

export const role = (state: { authSlice: TypeState }) =>
  state.authSlice.user.roles;
export const user = (state: { authSlice: TypeState }) => state.authSlice.user;

export const { AUTHENTICATE_USER_IN_STORE, LOGOUT_USER } = authSlice.actions;

export default authSlice.reducer;
