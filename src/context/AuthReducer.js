const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: localStorage.getItem('tokenA')
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
