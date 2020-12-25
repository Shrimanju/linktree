// import React, { useState, useEffect } from "react";
// // import "./appearance.css";
// import "./appearance.css";

// import { Avatar } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
// import Color1 from "../../../Assets/WhiteTheme.png";
// import Color2 from "../../../Assets/BlackTheme.png";
// import Color3 from "../../../Assets/GreyTheme.png";
// import db, { auth } from "../../../Firebase_config/firebase";
// import purple from "@material-ui/core/colors/purple";
// import pink from "@material-ui/core/colors/pink";
// import blue from "@material-ui/core/colors/blue";
// import { ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";
// import { ImageUrlAction } from "../../Redux/Action/ActionFile";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   firebaseApp,
//   storage,
//   database,
// } from "../../../Firebase_config/firebase";

// import ls from "local-storage";
// import { Check } from "@material-ui/icons";
// // import ReactLoading from "react-loading";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// // import  from 'bootstrap'
// const Appearance = () => {
//   const [image, setImage] = useState("");
//   const [URL, setURL] = useState("");
//   const [username, setUsername] = useState();
//   const [themeColor, setThemeColor] = useState("");
//   const dispatch = useDispatch();
//   const selectorImage = useSelector((state) => state.imageUrl);

//   // const forceUpdate = React.useState()[1].bind(null, {});

//   // forceUpdate();

//   // var user = firebaseApp.auth().currentUser;

//   //   console.log("username", user.email);
//   //   // console.log("Image", image);
//   //   storage
//   //     .ref(username)
//   //     .child("ProfileImage")
//   //     .child("ProfileImage.jpg")
//   //     .getDownloadURL()
//   //     .then((url) => {
//   //       setURL(url);

//   //       console.log("URL", url);
//   //     })
//   //     .catch(() => {
//   //       console.log("Error while fetching image");
//   //     });

//   useEffect(() => {
//     console.log("Inside UseEffect");
//     // forceUpdate();

//     // var user = firebaseApp.auth().currentUser;

//     // storage
//     //   .ref(user.email)
//     //   .child("ProfileImage")
//     //   .child("ProfileImage.jpg")
//     //   .getDownloadURL()
//     //   .then((url) => {
//     //     setURL(url);
//     //     // if (url) {
//     //     //   // dispatch(ImageUrlAction(url));
//     //     // }
//     //     // console.log("URL", url);
//     //   })
//     //   .catch(() => {
//     //     console.log("Error while fetching image");
//     //   });

//     // var user = firebaseApp.auth().currentUser;

//     // console.log("username", user.email);
//     // // console.log("Image", image);
//     // storage
//     //   .ref(username)
//     //   .child("ProfileImage")
//     //   .child("ProfileImage.jpg")
//     //   .getDownloadURL()
//     //   .then((url) => {
//     //     setURL(url);

//     // console.log("URL", url);
//     //   })
//     //   .catch(() => {
//     //     console.log("Error while fetching image");
//     //   });
//     firebaseApp.auth().onAuthStateChanged((user1) => {
//       db.collection("users")
//         .doc(user1.uid)
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             setUsername(doc.data().email);
//           } else {
//             console.log("Error in document");
//           }
//         });
//     });
//   }, []);

//   // console.log("username", user.email);
//   // console.log("Image", image);

//   // setURL(
//   //   `https://firebasestorage.googleapis.com/v0/b/${user.email}/ProfileImage/ProfileImage.jpg`
//   // );
//   // var storageImage = firebaseApp.storage();

//   // storageImage
//   //   .refFromURL(
//   //     "gs://linktree-8e19d.appspot.com/abc@mail.com/ProfileImage/ProfileImage.jpg"
//   //   )
//   //   .getDownloadURL()
//   //   .then((url) => {
//   //     setURL(url);

//   //     console.log("URL", url);
//   //   })
//   //   .catch(() => {
//   //     console.log("Error while fetching image");
//   //   });

//   useEffect(() => {
//     // forceUpdate();

//     var user = firebaseApp.auth().currentUser;
//     if (user) {
//       storage
//         .ref(user.email)
//         .child("ProfileImage")
//         .child("ProfileImage.jpg")
//         .getDownloadURL()
//         .then((url) => {
//           // setURL(url);
//           // if (url) {
//           //   dispatch(ImageUrlAction(url));
//           // }
//         })
//         .catch(() => {
//           console.log("Error while fetching image");
//         });
//     }
//   });

//   // useEffect(() => {
//   // storage
//   //   .ref(username)
//   //   .child("ProfileImage")
//   //   .child("ProfileImage.jpg")
//   //   .getDownloadURL()
//   //   .then((url) => {
//   //     setURL("");
//   //     setURL(url);

//   //     // console.log("URL", url);
//   //   });
//   // }, [username]);

//   // useEffect(() => {
//   //
//   // }, [username, URL]);

//   const clickHandler = (e) => {
//     const getImageimage = e.target.files[0];
//     // console.log("getImageimage", getImageimage);
//     if (getImageimage) {
//       storage
//         .ref(`${username}/ProfileImage/ProfileImage.jpg`)
//         .put(getImageimage);

//       setImage(getImageimage);
//     }
//   };

//   // const clickHandler = (e, data, image) => {
//   //   if (data == "imageUpload" && image != "") {
//   //     console.log("image", image);
//   //     console.log("Username", username);

//   //     const key = database.ref().child(auth.currentUser.uid).push().key;

//   //     const uploadImage = storage
//   //       .ref(`${username}/ProfileImage/ProfileImage.jpg`)
//   //       .put(image);

//   //     uploadImage.on(
//   //       "state_changed",
//   //       (snapshot) => {},
//   //       (error) => {
//   //         console.log(error);
//   //       },
//   //       () => {
//   //         storage
//   //           .ref(username)
//   //           .child("ProfileImage")
//   //           .child("ProfileImage.jpg")
//   //           .getDownloadURL()
//   //           .then((url) => {
//   //             setURL(url);
//   //           });
//   //       }
//   //     );
//   //   } else if (data === "imageRemove") {
//   //     console.log("data", data);

//   //     storage.ref(`${username}/ProfileImage/ProfileImage.jpg`).delete();

//   //     // .child("ProfileImage")
//   //     // .child("ProfileImage.jpg")

//   //     setURL("");
//   //   }
//   // };

//   const clickRemoveImageHandler = () => {
//     console.log("username", username);

//     // storage.refFromURL(`${username}/ProfileImage/ProfileImage.jpg`).delete();
//     storage
//       .ref(username)
//       .child("ProfileImage")
//       .child("ProfileImage.jpg")
//       .delete();

//     dispatch(ImageUrlAction(""));
//     setURL("");
//   };

//   const themeClickHandler = (backgroundColor, fontColor) => {
//     db.collection("users")
//       .doc(auth.currentUser.uid)
//       .collection("themeColor")
//       .doc("color")
//       .set({
//         bgColor: backgroundColor,
//         fontColor: fontColor,
//       });
//   };

//   return (
//     <div className="appearance">
//       <div className="heading col-md-6">
//         <h3>Profile</h3>
//       </div>
//       <div>
//         <div className="profile col-xs-12">
//           <div className="info row">
//             <div className="col-xs col-lg">
//               {selectorImage !== "" ? (
//                 // {URL ? (
//                 <>
//                   {/* <p> {console.log("image", image)}</p>
//                   <p> {console.log("URL", URL)}</p> */}

//                   {/* <LazyLoadImage
//                     alt="No Image"
//                     height="100px"
//                     width="120px"
//                     border="1px solid #d8d7de"
//                     borderRadius="100px"
//                     src={URL} // use normal <img> attributes as props
//                     width={image.width}
//                   /> */}

//                   <img
//                     className="avatar"
//                     style={{
//                       width: "120px",
//                       height: "100px",
//                       border: "1px solid #d8d7de",
//                       borderRadius: "100px",

//                     }}
//                     src={selectorImage || URL}

//                     alt="No Image"

//                   />
//                 </>
//               ) : (
//                 <>
//                   {/* <p> {console.log("image", image)}</p>
//                   <p> {console.log("URL", URL)}</p> */}
//                   <div  className="avatar1">
//                   <Avatar

//                     style={{
//                       width: "120px",
//                       height: "100px",
//                       backgroundColor: "lightgreen",
//                       border: "1px solid #d8d7de",
//                       borderRadius: "100px",
//                     }}
//                   />
//                   </div>
//                 </>
//               )}
//             </div>
//             {/* <div className="button11"> */}
//             <div className="buttons  col-xs col-lg">
//               <input
//                 id="fileUpload"
//                 style={{
//                   width: "250px",
//                   display: "none",
//                 }}
//                 type="file"
//                 onChange={clickHandler}
//               />
//               <label
//                 for="fileUpload"
//                 className="imageUploadButton"
//               >
//                 PICK AN IMAGE
//               </label>
//             </div>
//             <div className="buttons col-xs col-lg">
//               <Button
//                 onClick={clickRemoveImageHandler}
//                 className="imageRemoveButton"
//                 variant="contained"
//               >
//                 Remove
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//       {/* <div className="heading_themes">
//         <h3>Themes</h3>
//       </div>
//       <div className="themes">
//         <div className="row pt-2 pl-2 content">
//           <div className="col col-xs-12">
//             <img
//               src={Color1}
//               onClick={() => {
//                 themeClickHandler("white", "grey");
//               }}
//               style={{ width: "200px", height: "300px", cursor: "pointer" }}
//             />
//             <br></br>
//           </div>
//           <div className="col col-xs">
//             <img
//               src={Color2}
//               onClick={() => {
//                 themeClickHandler("#242322", "white");
//               }}
//               style={{ width: "200px", height: "300px", cursor: "pointer" }}
//             />
//           </div>
//           <div className="col col-xs">
//             <img
//               src={Color3}
//               onClick={() => {
//                 themeClickHandler("dimgray", "white");
//               }}
//               style={{ width: "200px", height: "300px", cursor: "pointer" }}
//             />
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Appearance;

import React, { useState, useEffect } from "react";
// import "./appearance.css";
import "./appearance.css";
import UploadImage from "../ImageUpload/imageUpload";

import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Color1 from "../../../Assets/WhiteTheme.png";
import Color2 from "../../../Assets/BlackTheme.png";
import Color3 from "../../../Assets/GreyTheme.png";
import db, { auth } from "../../../Firebase_config/firebase";
import purple from "@material-ui/core/colors/purple";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";
import { ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";
import { ImageUrlAction } from "../../Redux/Action/ActionFile";
import { useSelector, useDispatch } from "react-redux";
import {
  firebaseApp,
  storage,
  database,
} from "../../../Firebase_config/firebase";
import firebase from "firebase";
import ls from "local-storage";
import { Check } from "@material-ui/icons";
import ReactLoading from "../ImageLoader/spinner";
// import ReactCropper from "react-cropper";
import ReactCropImage from "../CropImage/cropImage";
import ImageUploadWithCrop from "../ImageUpload/imageUpload";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// import  from 'bootstrap'
const Appearance = () => {
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");
  const [username, setUsername] = useState();
  const [themeColor, setThemeColor] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const selectorImage = useSelector((state) => state.imageUrl);
  const [disableButton, setDisableButton] = useState(true);
  const [cropImage, setCropImage] = useState("");
  // const forceUpdate = React.useState()[1].bind(null, {});
  const [imageDelete, setImageDeleted] = useState(false);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user1) => {
      db.collection("users")
        .doc(user1.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().email);
          } else {
            console.log("Error in document");
          }
        });
    });
  }, []);

  // useEffect(() => {
  //   if (username) {
  //     db.collection("users")
  //       .doc(auth.currentUser.uid)
  //       .collection("imageURL")
  //       .doc("url")
  //       .get()
  //       .then(function (doc) {
  //         if (doc.exists) {
  //           // setColor(doc.data());
  //           console.log("URL", doc.data());

  //           setURL(doc.data().URL);
  //         } else {
  //           console.log("No such document!");
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log("Error in getting URL:", error);
  //       });
  //   }
  // }, [username]);

  // useEffect(() => {
  //   // if (username && !URL && !selectorImage) {
  //   //   storage
  //   //     .ref("abc@mail.com")
  //   //     .child("ProfileImage")
  //   //     .child("ProfileImage.jpg")
  //   //     .getDownloadURL()
  //   //     .then((url) => {
  //   //       // setURL("");
  //   //       setURL(url);
  //   //       console.log("CropURL", URL);
  //   //       setLoading(false);
  //   //       console.log("URL", url);
  //   //     });
  //   // }
  //   // .ref(username)
  //   // else {
  //   //   setLoading(true);
  //   // }
  // }, [username, selectorImage]);

  // useEffect(() => {}, [username, URL]);

  const clickHandler = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
      console.log("Files", files);
    } else if (e.target) {
      files = e.target.files;
    }
    if (files[0] !== "undefined") {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }

    ///------------------------------------------------------------///

    // const getImageimage = e.target.files[0];
    // console.log("getImageimage", getImageimage);
    // if (getImageimage) {
    // storage
    //   .ref(`${username}/ProfileImage/ProfileImage.jpg`)
    //   .put(getImageimage)
    //   .then(() => {
    //     // setLoading(true);
    //     setDisableButton(false);
    //   });
    // setImage(getImageimage);
    // }
  };

  useEffect(() => {
    console.log("Image", image);
  }, [image]);

  useEffect(() => {
    if (cropImage) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("imageURL")
        .doc("url")
        .set({
          URL: cropImage,
        });

      // storage
      //   .ref(`abc@mail.com/ProfileImage/ProfileImage.jpg`)
      //   .put(cropImage)
      //   .then(() => {
      //     // setLoading(true);
      //     setDisableButton(false);
      //   });
    }

    // .ref(`${username}/ProfileImage/ProfileImage.jpg`)
  }, [cropImage]);

  const clickRemoveImageHandler = () => {
    setDisableButton(true);

    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("imageURL")
      .doc("url")
      .delete()
      .then(() => {
        dispatch(ImageUrlAction(""));
        // setImageDeleted(true);
        //     setLoading(false);
      })
      .catch(() => {
        console.log("ERROR Deleting image");
      });

    // storage
    //   .ref(username)
    //   .child("ProfileImage")
    //   .child("ProfileImage.jpg")
    //   .delete()
    //   .then(() => {
    //     dispatch(ImageUrlAction(""));
    //     setLoading(false);

    //     // forceUpdate();
    //     setURL("");
    //     console.log("Image deleted in firebase");
    //   })
    //   .catch(() => {
    //     console.log("ERROR Deleting image");
    //   });
  };

  // useEffect(() => {
  //   if (selectorImage) {
  //     setLoading(false);
  //   }

  // }, [selectorImage]);

  const themeClickHandler = (backgroundColor, fontColor) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("themeColor")
      .doc("color")
      .set({
        bgColor: backgroundColor,
        fontColor: fontColor,
      });
  };

  return (
    <div className="appearance">
      <div className="heading col-md-6">
        <h3>Profile</h3>
      </div>
      <div className="profile-update">
        <div className="profile col-xs-12">
          <div className="info row">
            <div className="col-xs col-lg">
              <ImageUploadWithCrop
                getImage={image}
                disableLoading={disableButton}
                disableRemoveButton={(enable) => {
                  setDisableButton(enable);
                }}
                width={"100px"}
                height={"100px"}

              />

              <div className="buttons  col-xs col-lg">
                <input
                  id="fileUpload"
                  style={{
                    width: "250px",
                    display: "none",
                  }}
                  type="file"
                  onChange={clickHandler}
                />
                <label
                  for="fileUpload"
                  className="imageUploadButton"
                >
                  {/* PICK AN IMAGE */}
                Pick an image
              </label>
              </div>
              <div className="buttons col-xs col-lg">
                <button
                  onClick={clickRemoveImageHandler}

                  className="clearButton"
                  disabled={disableButton}
                >
                  Remove
              </button>

              </div>
            </div>
          </div>
</div>
        </div>

        <div className="heading_themes">
          <h3>Themes</h3>
        </div>
        <div className="themes">
          <div className="row pt-2 pl-2 content">
            <div className="col col-xs-12">
              <img
                src={Color1}
                onClick={() => {
                  themeClickHandler("white", "grey");
                }}
                className="color1"

              />
              <br></br>
            </div>
            <div className="col col-xs">
              <img
                src={Color2}
                onClick={() => {
                  themeClickHandler("#242322", "white");
                }}
                className="color1"
              // style={{ width: "200px", height: "300px", cursor: "pointer" }}
              />
            </div>
            <div className="col col-xs">
              <img
                src={Color3}
                onClick={() => {
                  themeClickHandler("dimgray", "white");
                }}
                className="color1"
              // style={{ width: "200px", height: "300px", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
  
      </div>
  );
};

export default Appearance;