import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_TODO,
  GET_TODOS,
  DELETE_TODO
} from "./types";

//  Add a todo
export const addTodo = todoData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/todos", todoData)
    .then(res =>
      dispatch({
        type: ADD_TODO,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//  Get todos
export const getTodos = () => dispatch => {
  axios
    .get("/api/todos")
    .then(res =>
      dispatch({
        type: GET_TODOS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
    });
};

//  Update Todo Item
export const updateTodo = updateTodoItem => dispatch => {
  axios
    .post(`/api/todos/${updateTodoItem.id}`, updateTodoItem)
    .then(dispatch(getTodos()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    });
  dispatch(getTodos());
};

// Delete Todo
export const deleteTodo = id => dispatch => {
  axios
    .delete(`api/todos/${id}`)
    .then(
      dispatch({
        type: DELETE_TODO,
        payload: id
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//  Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
