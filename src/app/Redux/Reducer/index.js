import {
  getColorForThemeReducer,
  getImageUrl,
  // UserDeatailsReducer,
} from "./ReducerFile";

import { combineReducers } from "redux";

const everyReducers = combineReducers({
  themeColor: getColorForThemeReducer,
  imageUrl: getImageUrl,
  // UserInfo: UserDeatailsReducer,
});

export default everyReducers;
