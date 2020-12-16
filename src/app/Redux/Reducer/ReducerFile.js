export const getColorForThemeReducer = (state = "", action) => {
  switch (action.type) {
    case "themeColor":
      return (state = action.payload);

    default:
      return state;
  }
};

export const getImageUrl = (state = "", action) => {
  switch (action.type) {
    case "imageUrl":
      return (state = action.payload);

    default:
      return state;
  }
};

// export const UserDeatailsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "UserInfo":
//       return (state = {
//         email: action.payload1,
//         name: action.payload2,
//       });

//     default:
//       return state;
//   }
// };
