import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      //navigate to main flow.
      navigate("TrackList");
    } catch (err) {
      console.log(err.message);
      if (err.response.data === undefined) {
        console.log(err.response.data);
      }
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up.",
      });
    }
  };
};

const clearError = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error" });
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Sign in.",
      });
    }
  };
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("Signup");
};

const tryLocalSignIn = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      navigate("TrackList");
    } else {
      navigate("Signup");
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearError, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
