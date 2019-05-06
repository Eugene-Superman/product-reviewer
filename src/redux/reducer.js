import {
  AUTHORIZE_USER,
  ADD_COMMENTS_LIST
} from "../constants";

const initialState = {
  isUserAuthorized: localStorage.getItem('token') ? true : false,
  commentsList: [],
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE_USER:
      return {
        ...state,
        isUserAuthorized: action.payload
      };
    case ADD_COMMENTS_LIST:
      return {
        ...state,
        commentsList: action.payload
      };
    default:
      return state;
  }
}