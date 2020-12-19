export const getColorForThemeReducer = (state = "", action) => {
  switch (action.type) {
    case "themeColor":
      return (state = action.payload);

    default:
      return state;
  }
};
