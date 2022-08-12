let initialState = {
  list: [],
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN SUCCESS':
      return { ...state };
    case 'LOGIN FAILED':
      return { ...state };
    default:
      return state;
  }
};
