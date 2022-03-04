import { initialState } from "./initialState";

export const ADD_CHARACTER = "ADD_CHARACTER";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CHARACTER:
      return state;

    default:
      return state;
  }
};

export default reducer;
