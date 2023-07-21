
import { combineReducers } from "redux";
import reducer from "./reducer";


 const rootReducer=combineReducers({TaskDescriptionDetail:reducer});


 export default  rootReducer;