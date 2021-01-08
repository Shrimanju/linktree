import React, { useState, useEffect } from "react";
import "./profile.css";
import db, { auth } from "../../../Firebase_config/firebase";
import { ImageUrlAction } from "../../Redux/Action/ActionFile";
import { useSelector, useDispatch } from "react-redux";
import {
    firebaseApp,
    storage,
    database,
} from "../../../Firebase_config/firebase";
import ImageUploadWithCrop from "../ImageUpload/imageUpload";
import Editbio from '../Editbio/editbio'
import Editnameandbio from '../Editnameandbio/editnameandbio'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import EmojiPicker from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import JSEMOJI from "emoji-js";
import { useHistory } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import EditIcon from '@material-ui/icons/Edit';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
let jsemoji = new JSEMOJI();
const Profile = () => {
    const [image, setImage] = useState("");
    const [username, setUsername] = useState();
    const dispatch = useDispatch();
    const [disableButton, setDisableButton] = useState(true);
    const [cropImage, setCropImage] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl5, setAnchorEl5] = React.useState(null);
    const [anchorEl10, setAnchorEl10] = React.useState(null);
    const [inputVal, setInputVal] = useState('')
  const [userbio, setUserbio] = useState("");
  const [emojies, setEmojies] = useState("");
  const [text, setText] = useState("");
  const [bio, setBio] = useState("");
  const { handleSubmit, register, errors } = useForm({});
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const[changetext,setChangetext]= useState("enter name");




   
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
        }};

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
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;


    //edit name 
    let history = useHistory();

    const useStyles = makeStyles((theme) => ({
  
      typography: {
        padding: theme.spacing(2),
      },
      value: {
        color: "red"
      },
      underline: {
        "&&&:before": {
          borderBottom: "none"
        },
        "&&:after": {
          borderBottom: "none"
        }
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
              setUsername(snapshot.data().name)
            }})
    }, []);



//edit bio part
const handleClick10 = (event) => {
    setAnchorEl10(event.currentTarget);
  };

  const handleClose10= () => {
    setAnchorEl10(null);
  };
  const open10 = Boolean(anchorEl10);
  const id10 = open10 ? 'simple-popover' : undefined;

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5= () => {
    setAnchorEl5(null);
  };
  const open5= Boolean(anchorEl5);
  const id5 = open5 ? 'simple-popover' : undefined;

  const onSubmit4 = (data) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        bio: data.bio,
      });
  }

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          //  console.log(snapshot.data().name)
          setUserbio(snapshot.data().bio)
        }
      })
  }, []);


//   useEffect(() => {
//     console.log(anchorEl)
//   }, [anchorEl4]
//   );

  // useEffect(()=>{
  //   if(text){
  //     let value=text+emojies
  //     setBio(value)


  //   }
  //   else{
  // setBio(text)
  //  setEmojies("")
  //   }

  // setBio(emojies.emoji+text)
  // console.log(text+emojies.emoji)
  // },[text,emojies]
  // );

 



  const handleClick6 = (event, emojiObject) => {
    console.log(event)
    // console.log(emojiObject)
    setEmojies(emojiObject.emoji)
    // console.log(C)   
    setBio(text + emojiObject.emoji)
    // let emoji = jsemoji.replace_colons(`:${e.name}:`)
    // console.log("emogi",emoji)
    // let emoji = jsemoji.replace_colons(`:${e.name}:`);
    // setText({
    //   text: text 
    // });
    // console.log(text.text);
  };
  const   onPress = () => {
    setChangetext({
      changetext: {username}
    })
  }

    return (
        <div>

            <div className="profile">
                <div className="editprofilebutton">

                <button
                      aria-describedby={id}
                      onClick={handleClick1}
                    
                      className="topeditbutton"
                      disabled={!username||!userbio}         
                                >
                                <EditIcon style={{fontSize: '15px'}} 
                                className="topeditbutton1"/>
                                </button> 

{/* 
                    <EditIcon
                        aria-describedby={id}
                        onClick={handleClick1}
     
                        className="editbutton"
                        disabled={username}        

                    >
                    </EditIcon> */}

                    <Popover
                        id={id1}
                        open={open1}
                        anchorEl={anchorEl1}
                        onClose={handleClose1}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            style: { width: '49%', height: '24%' },
                        }}
                    >
                        <Typography className={classes.typography}>
                            <Editnameandbio />
                        </Typography>
                    </Popover>
                </div>
                <div className='editimagewithicon'>
                    <div className="profileimagefield" >
              <button aria-describedby={id} 
               onClick={handleClick} 
               disabled={!image?false:true}
               className="imageuploadsqare" 
            
               >
                        <ImageUploadWithCrop
                            //  onClick={handleClick}
                            getImage={image}

                            disableLoading={disableButton}
                            disableRemoveButton={(enable) => {
                                setDisableButton(enable);
                            }}
                            width={"100px"}
                            height={"100px"}
                         
                    
                        >
                         
                            </ImageUploadWithCrop>
                            </button> 
                    </div>

                   
                    <div className="editimageicon">
                      
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
{/* ------------------------------------------------------------------------------------------------------------------------------- */}
{/* edit name */}

                <div className='editnameandbio'>
                    <div className="editnamefield">
                    <div className="editborder">
                    {/* <p onChange={onPress}>{changetext}</p> */}
      <form onSubmit={handleSubmit(onSubmit)} className="editnameandicon1">
          
        <TextField
          type="text"
          name="name"
          value={!username?"enter name":username} 
            onChange={e => setInputVal(e.target.value)}
          inputRef={register({ required: true })}
          InputProps={{ className: classes.underline }}
          className="editname1"
        // label="Enter name"
        />
        <br></br>
        </form>
    </div>
                    </div>

{/* Editb bio part */}
{/* ------------------------------------------------------------------------------------------------------------------------------- */}


                    <div className="editbiofield">
                    <div className="bioborder">
        <div className="updatebiolabel">

          {userbio ? 
          <p aria-describedby={id10} className="biobordertext">{userbio}</p> :
           <p aria-describedby={id10} onClick={handleClick10} className="biobordertext">update bio..</p>}
        </div>

      </div>
      <Popover
        id={id10}
        open={open10}
        anchorEl={anchorEl10}
        onClose={handleClose10}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 440 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

      >
      <Typography className={classes.typography}>
          <form onSubmit={handleSubmit(onSubmit4)}>


            <TextField
              id="standard-multiline-static"
              multiline={true}

              rows={5}
              type="text"
              name="bio"
              value={bio || text}
              onChange={e => setText(e.target.value)}
              // value= {text?text+emojies.emoji:null}
              InputProps={{ classes }}
              inputRef={register()}
              id="standard-basic"
              data-emoji="true"

              className="editbiotext"
            />
            <SentimentSatisfiedIcon onClick={handleClick5} />
            <Popover
              id={id}
              open={open5}
              anchorEl={anchorEl}
              onClose={handleClose5}
            >
              <Typography className={classes.typography}> <EmojiPicker onEmojiClick={handleClick6} /></Typography>
            </Popover>
<br></br>
            <div className="editbiobutton11">
              <button
                type="submit"
                variant="contained"
                className="editbiobutton1"
>
Update
            </button>
            </div>
          </form>
        </Typography>
           </Popover>
      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
