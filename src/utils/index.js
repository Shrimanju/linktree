import db, { auth } from "../Firebase_config/firebase";
import { useSelector } from "react-redux";
// export const firebaseUserDetails = db
//   .collection("users")
//   .doc(auth.currentUser.uid)
//   .get();

export const Base_URL = "https://link-listing.netlify.app";

// export const Base_URL = "http://localhost:3000";

// export const selectorImage = () => {
//   return useSelector((state) => state.imageUrl);
// };
