import * as Action from '../actions/user.action';

const initialState = {
  isLogging: true,
  isLoading: false,
  error: null,
  user: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Action.REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Action.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false
      }
    }
    case Action.REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case Action.LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Action.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false
      }
    }
    case Action.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case Action.TOKEN_LOGIN_REQUEST: {
      return {
        ...state,
        isLogging: true
      }
    }
    case Action.TOKEN_LOGIN_SUCCESS: {
      return {
        ...state,
        isLogging: false,
        user: action.payload
      }
    }
    case Action.TOKEN_LOGIN_FAILURE: {
      return {
        ...state,
        isLogging: false
      }
    }

    default: {
      return state;
    }
  }
}

export default user;
