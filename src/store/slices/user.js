import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { dispatch } from "../index";

const initialState = {
  error: null,
  usersS1: [],
  usersS2: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET USERS STYLE 1
    getUsersListStyle1Success(state, action) {
      state.usersS1 = action.payload;
    },

    // GET USERS STYLE 2
    getUsersListStyle2Success(state, action) {
      state.usersS2 = action.payload;
    },
  },
});

export default slice.reducer;

export function getUsersListStyle1() {
  return async () => {
    try {
      const response = await axios.get("/api/user-list/s1/list");
      dispatch(slice.actions.getUsersListStyle1Success(response.data.users_s1));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUsersListStyle2() {
  return async () => {
    try {
      const response = await axios.get("/api/user-list/s2/list");
      dispatch(slice.actions.getUsersListStyle2Success(response.data.users_s2));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
