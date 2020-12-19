// import React, { useState, useEffect } from "react";
// import {
//   firebaseApp,
//   storage,
//   database,
// } from "../../../Firebase_config/firebase";

// const ImageUpload = () => {
//   const [URL, setURL] = useState("");
//   const [image, setImage] = useState("");

//   useEffect(() => {
//     var user = firebaseApp.auth().currentUser;

//     console.log("username", user.email);
//     // console.log("Image", image);
//     storage
//       .ref(user.email)
//       .child("ProfileImage")
//       .child("ProfileImage.jpg")
//       .getDownloadURL()
//       .then((url) => {
//         setURL(url);

//         console.log("URL", url);
//       })
//       .catch(() => {
//         console.log("Error while fetching image");
//       });
//   });

//   const clickHandler = (e) => {
//     const getImageimage = e.target.files[0];
//     // console.log("getImageimage", getImageimage);
//     if (getImageimage) {
//       const uploadImage = storage
//         .ref(`${username}/ProfileImage/ProfileImage.jpg`)
//         .put(getImageimage);

//       setImage(getImageimage);
//     }
//   };

//   return (
//     <div className="col-xs col-lg">
//       {URL ? (
//         <>
//           {/* <p> {console.log("image", image)}</p>
//                   <p> {console.log("URL", URL)}</p> */}
//           <img
//             className="avatar"
//             style={{
//               width: "120px",
//               height: "100px",
//               border: "1px solid #d8d7de",
//               borderRadius: "100px",
//               // backgroundColor: "lightgreen",
//             }}
//             src={URL}
//             alt="No Image"
//             // src={selectorImage}
//           />
//         </>
//       ) : (
//         <>
//           {/* <p> {console.log("image", image)}</p>
//                   <p> {console.log("URL", URL)}</p> */}
//           <Avatar
//             className="avatar"
//             style={{
//               width: "120px",
//               height: "100px",
//               backgroundColor: "lightgreen",
//               border: "1px solid #d8d7de",
//               borderRadius: "100px",
//             }}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;
