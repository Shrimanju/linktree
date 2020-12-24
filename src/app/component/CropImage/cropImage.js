import React, { useState, useEffect } from "react";
import Cropper from "react-cropper";
import Dialog from "@material-ui/core/Dialog";
import "cropperjs/dist/cropper.css";
import "./cropImage.css";
import { useSelector, useDispatch } from "react-redux";
import { ImageUrlAction } from "../../Redux/Action/ActionFile";

// const defaultSrc =
//   "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const CropImage = (props) => {
  // const { onClose, selectedValue, open } = props;

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState("");
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setImage(props.imageFile);
    console.log("get image");
  }, []);

  useEffect(() => {
    if (image !== "undefined") {
      console.log("Image");
      setOpenDialogBox(props.onOpen);
    }
  }, [image]);

  const handleClose = () => {
    // setDialogClose(true);
    setOpenDialogBox(false);
  };

  // const handleOpen = () => {
  //   // setDialogClose(true);s
  //   // setOpenDialogBox(false);
  //   setOpenDialogBox(props.onOpen);
  // };

  //   const onChange = (e) => {
  //     e.preventDefault();
  //     let files;
  //     if (e.dataTransfer) {
  //       files = e.dataTransfer.files;
  //     } else if (e.target) {
  //       files = e.target.files;
  //     }
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(files[0]);
  //   };

  const getCropData = () => {
    if (cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());

      if (props.getImageURL) {
        props.getImageURL(cropper.getCroppedCanvas().toDataURL());
      }

      dispatch(ImageUrlAction(cropper.getCroppedCanvas().toDataURL()));
    }
  };

  // const clickeSave = () => {
  //   setOpenDialogBox(false);
  // };

  // useEffect(() => {
  //   setOpenDialogBox(props.onOpen);
  // }, [cropData]);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openDialogBox}
      key={props.imageFile}
      // open={handleOpen}
    >
      <div style={{ width: "100%" }}>
        {/* <input type="file" onChange={onChange} /> */}
        {/* <button>Use default img</button> */}
        <h3 style={{ textAlign: "center" }}>Crop Image</h3>

        <Cropper
          style={{ height: 400, width: 400 }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>
      <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          {/* <h1>Preview</h1> */}
          {/* <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>  */}
          {/* <div
          className="box"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span> */}
          <button
            onClick={getCropData}
            style={{
              textAlign: "center",
              marginLeft: "-50%",
              marginRight: "30%",
              marginBottom: "5%",
            }}
          >
            Crop
          </button>
          <button onClick={handleClose} style={{ textAlign: "center" }}>
            Save
          </button>
          {/* </h1> */}
          {/* <img style={{ width: "100%" }} src={cropData} alt="cropped" /> */}
        </div>
      </div>
      {/* <br style={{ clear: "both" }} /> */}
    </Dialog>
  );
};

export default CropImage;

// export default function CropImageDialog(props) {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState("Crop Image");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>

//       <button
//         style={{ width: "200px", background: "white" }}
//         onClick={handleClickOpen}
//       >
//         <span style={{ color: "#75736d", fontSize: "80%" }}>
//           Download my QR code
//         </span>
//       </button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//         username={props.username}
//       />
//     </div>
//   );
// }
