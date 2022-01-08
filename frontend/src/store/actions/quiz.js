import * as actionType from "./actionTypes";
import axios from "axios";
import { endpoint } from "../utility";
export const quizStart = () => {
  return {
    type: actionType.QUIZ_START,
  };
};
export const quizFail = () => {
  return {
    type: actionType.QUIZ_FAIL,
  };
};
export const quizGetSuccess = (list) => {
  return {
    type: actionType.QUIZ_GET_SUCCESS,
    payload: list,
  };
};
export const quizDetailSuccess = (detail) => {
  return {
    type: actionType.QUIZ_DETAIL_SUCCESS,
    payload: detail,
  };
};

export const getQuiz = () => {
  return (dispatch) => {
    dispatch(quizStart());
    axios
        .get(endpoint)
        .then((res) => {
            dispatch(quizGetSuccess(res.data))
        })
        .catch((err)=>{
          console.log(err.response)
          dispatch(quizFail());
        })
  };
};
export const detailQuiz = (quizId) => {
  return (dispatch) => {
    dispatch(quizStart());
    axios
        .get(`${endpoint}/${quizId}`)
        .then((res) => {
            dispatch(quizDetailSuccess(res.data))
        })
        .catch((err)=>{
          console.log(err.response)
          dispatch(quizFail());
        })
  };
};
