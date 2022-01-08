import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  quizGet: [],
  quizDetail: {},
  loading: false
};

const quizStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const quizGetSuccess = (state, action) => {
  return updateObject(state, {
    quizGet: action.payload,
    loading: false
  });
};
const quizDetailSuccess = (state, action) => {
  return updateObject(state, {
    quizDetail: action.payload,
    loading: false
  });
};
const quizFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const quiz_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.QUIZ_START:
      return quizStart(state, action);
    case actionType.QUIZ_GET_SUCCESS:
      return quizGetSuccess(state, action);
    case actionType.QUIZ_DETAIL_SUCCESS:
      return quizDetailSuccess(state, action);
    case actionType.QUIZ_FAIL:
      return quizFail(state, action);
    default:
      return state;
  }
};

export default quiz_reducer;
