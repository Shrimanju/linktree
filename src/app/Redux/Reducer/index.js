import { getColorForThemeReducer } from "./getColorForThemeReducer";

import { combineReducers } from "redux";

const everyReducers = combineReducers({
  themeColor: getColorForThemeReducer,
});

export default everyReducers;
