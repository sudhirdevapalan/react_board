export default (state, action) => {
  switch (action.type) {
    case "addList":
      return {
        ...state,
      };
    case "removeList":
      return {
        ...state,
      };
    case "addCard":
      return {
        ...state,
      };
    case "removeCard":
      return {
        ...state,
      };
    case "addComment":
      return {
        ...state,
      };
    default:
      return state;
  }
};