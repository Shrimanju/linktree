
import React, { useState, useEffect } from "react";
import "./editnameandbio.css"
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
import { CreateCustomTheme } from "../CustomTheme/customTheme";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import Editname from '../Editname/editname'
import Editbio from '../Editbio/editbio'
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { Container, Card, Accordion } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import CheckIcon from '@material-ui/icons/Check';
// import EmojiPicker from "emoji-picker-react";
// import JSEMOJI from "emoji-js";
// let jsemoji = new JSEMOJI();

// // // set the style to emojione (default - apple)
// // jsemoji.img_set = "emojione";
// // // // set the storage location for all emojis
// // jsemoji.img_sets.emojione.path ="https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/";
  

// // // some more settings...
// // jsemoji.supports_css = false;
// // jsemoji.allow_native = true;
// // jsemoji.replace_mode = "unified";
const Editnameandbio = () => {
    let history = useHistory();
    const { handleSubmit, register, errors } = useForm({
    });
    
    const useStyles = makeStyles((theme) => ({
        inputLabel: {
            fontSize:14,
            fontWeight:500,
            color:'black'
          },
        typography: {
            padding: theme.spacing(2),
        },
        underline: {
            "&&&:before": {
                borderBottom: "none"
            },
            "&&:after": {
                borderBottom: "none"
            }
        },
        floatingLabelFocusStyle: {
            color: "red"
        }

    }));
    const onSubmit = (data) => {
        db.collection("users")
            .doc(auth.currentUser.uid)
            .update({
                name: data.name,
            });
    }
    const classes = useStyles();
    useEffect(() => {
        db.collection("users")
            .doc(auth.currentUser.uid)
            .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    //  console.log(snapshot.data().name)
                    setUsername1(snapshot.data().name)
                }

            })


    }, []);
    const [image, setImage] = useState("");
    const [URL, setURL] = useState("");
    const [username, setUsername] = useState();
    const [username1, setUsername1] = useState();
    const [themeColor, setThemeColor] = useState("");
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // const selectorImage = useSelector((state) => state.imageUrl);
    const [disableButton, setDisableButton] = useState(true);
    const [cropImage, setCropImage] = useState("");
    // const forceUpdate = React.useState()[1].bind(null, {});
    const [imageDelete, setImageDeleted] = useState(false);
    const [userbio, setUserbio] = useState();
    const [disabled,setDisabled] = useState(true);
    const [inputVal, setInputVal] = useState('')

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


    };

    useEffect(() => {
        // console.log("Image", image);
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
        }
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

            })
            .catch(() => {
                console.log("ERROR Deleting image");
            });
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;


//     const [anchorEl2, setAnchorEl2] = React.useState(null);
//     const[emojies,setEmojies]=useState("");
//     const[text,setText]=useState(null);
  
//     const handleClick2 = (event) => {
//       setAnchorEl2(event.currentTarget);
//     };
  
//     const handleClose2 = () => {
//       setAnchorEl2(null);
//     };
//     const onSubmit3 = (data) => {
//       db.collection("users")
//       .doc(auth.currentUser.uid)
//       .update({
//         bio: data.bio,
//       });
     
//     }
//       useEffect(() => {
//   db.collection("users")
//   .doc(auth.currentUser.uid)
//   .onSnapshot((snapshot)=>{
//    if(snapshot.exists){
//     //  console.log(snapshot.data().name)
//     setUserbio(snapshot.data().bio)
//    } 
  
//   })
  
  
//   }, []);
//   useEffect(()=>{
//   console.log(anchorEl)
//   },[anchorEl]
//   );
//     const open2 = Boolean(anchorEl2);
//     const id2= open2 ? 'simple-popover' : undefined;
//     const [chosenEmoji, setChosenEmoji] = useState(null);
//   const handleClick3= (event, emojiObject) => {
//     console.log(event)
//     // console.log(emojiObject)
//     setEmojies(emojiObject) 
//           console.log(emojiObject.emoji)                    
//     // let emoji = jsemoji.replace_colons(`:${e.name}:`)
//     // console.log("emogi",emoji)
//     // let emoji = jsemoji.replace_colons(`:${e.name}:`);
//     // this.setState({
//     //   text: this.state.text + emoji
//     // });
//     // console.log(emoji);
//   };

    return (
        <div >
            <div className="profile11">
                <div className='editimagewithicon'>
                    <div className="profileimagefield" onClick={handleClick}>
                    
                        
                        <ImageUploadWithCrop
                       
                            getImage={image}
                            disableLoading={disableButton}
                            disableRemoveButton={(enable) => {
                                setDisableButton(enable);
                            }}
                            width={"100px"}
                            height={"100px"}
                        >
{/* <EditIcon onClick={handleClick} className="editbutton"></EditIcon> */}
                        </ImageUploadWithCrop>
                       
                    </div>


                    <div className="editimageicon">
                        {/* <EditIcon aria-describedby={id} onClick={handleClick} className="editbutton">
                        </EditIcon> */}
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}

                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            PaperProps={{
                                style: { width: '20%' }
                            }}
                        >
                            <Typography className={classes.typography}>
                                <div className="imageuploadandremove">
                                    <div className="buttons buttonss col-xs col-lg">
                                        <input
                                            id="fileUpload"
                                            style={{
                                                display: "none",
                                            }}
                                            type="file"
                                            onChange={clickHandler}
                                        />
                                        <label
                                            for="fileUpload"
                                            className="imageUploadButton"
                                        >
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
                            </Typography>
                        </Popover>
                    </div>
                </div>
                <div className='editnameandbio1'>
                    <div className="editnamefield1">
                        <div >

                            <form onSubmit={handleSubmit(onSubmit)} className="editnameandicon11">
                                <TextField
                                 InputLabelProps={{
                                    classes: {
                                      root: classes.inputLabel,
                                
                                    }
                                  }}
                                    type="text"
                                    name="name"
                                    value={inputVal} 
                                    onChange={e => setInputVal(e.target.value)}
                                    inputRef={register({ required: true })}
                                    InputProps={{ classes }}
                                    className="editname11"
                                    label="Update display name"
                                    // onChange={ e => setDisabled(e.target.name)}
                                    // floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                                // defaultValue="Update display name"
                                />
                                <button
                                    type="submit"
                                    className="editnamesubmitbutton"
                                    disabled={!inputVal}           
                                >
                                    <CheckIcon />
                                </button>
                                <br></br>


                            </form>
                        </div>
                    </div>


                    <div className="editbiofield">
                        <Editbio/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editnameandbio;
