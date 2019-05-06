import {
  AUTHORIZE_USER,
  ADD_COMMENTS_LIST
} from "../constants";

export const authorizeUser = isUserAuthorized => ({
  type: AUTHORIZE_USER,
  payload: isUserAuthorized
});

export const addCommentsList = comments => ({
  type: ADD_COMMENTS_LIST,
  payload: comments
});

