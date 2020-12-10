const getColorForThemeAction = (value) => {
  return {
    type: "themeColor",
    payload: value,
  };
};

export default getColorForThemeAction;
