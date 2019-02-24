import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  errors: errorReducer,
  todos: todoReducer
});
