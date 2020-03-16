import { LOGIN, REGISTER, AUTH } from '../actions/user';

const initialState = {
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case REGISTER:
      return {
        ...state,
        register: action.payload,
      };

    case AUTH:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
