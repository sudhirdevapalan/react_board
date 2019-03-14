import { createStore } from "redux";
import dashboardReducer from "./reducers/dashboardReducer";
function configureStore(state = {}) {
  return createStore(dashboardReducer,state);
}
export default configureStore;