export const getColorForThemeAction = (value) => {
  return {
    type: "themeColor",
    payload: value,
  };
};

export const ImageUrlAction = (value) => {
  return {
    type: "imageUrl",
    payload: value,
  };
};

// export const DisplayImage=()=>{
//   return
// }

// export const userDetailsAction = (value1, value2) => {
//   return {
//     type: "UserInfo",
//     payload1: value1,
//     payload2: value2,
//   };
// };
