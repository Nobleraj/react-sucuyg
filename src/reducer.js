const login = (state = initialState, action) =>{
  switch(action.type){
    case "LOGIN SUCCESS"
    return {...state}
    break;
    default:
    return state;
  }
}