import React, { useState, useEffect ,useRef } from "react";
import DragIndicatorIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import TodayIcon from '@material-ui/icons/Today';
import BarChartIcon from '@material-ui/icons/BarChart';
import Switch from "react-switch";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import classes from '../component/LinkContainer/LinkContainer.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Accordion, Button } from "react-bootstrap";


import Modal from 'react-modal'

const Demo = (props) => {
  const [links, setlinks] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [modalIsOpen1, setmodalIsOpen1] = useState(false);
  const [checked, setChecked] = useState();
  const [activeKey, setActiveKey] = useState("");

  // we are going to need a ref to the Accordion element to get its position/use the scrollIntoView function
  const accordElem = useRef(null);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();

  function closeModal(){
    setmodalIsOpen(false)
  }
  

  return (
   
    <div className={classes.linkcontainer}>
     
     <DragIndicatorIcon />
      <div className={classes.drag_drop}>      
      </div>

      <div className={classes.link_body}>
        <div className={classes.title}>
          <input
            id="text"
            type="text"
           
            placeholder="Enter Url &#xf044;"
            style={{ fontFamily: "FontAwesome", fontWeight: "bold" }}
       
          />
          <Switch
           
            checked={props.isactive ? props.isactive : checked}
          />
        </div>

        <div className={classes.url}>
          <input
            type="text"
           
            placeholder="Enter Url &#xf044;"
            style={{ fontFamily: "FontAwesome" }}
            
          />
        </div>


        <div className={classes.iconsbottom}>

            
          <div className={classes.iconsleft}>
            <IconButton
              className={classes.iconbtnleft}
              onClick={() => {
                setmodalIsOpen(!modalIsOpen);
              }}
            >
            <DeleteOutlineOutlinedIcon />
            </IconButton>
<IconButton
  className={classes.iconbtnleft}
  onClick={() => {
    setmodalIsOpen1(!modalIsOpen1);
  }}
>
<DeleteOutlineOutlinedIcon />
</IconButton>

</div>



          <div className={classes.icons}>
            <IconButton
              className={classes.iconbtn}
              onClick={() => {
                props.onDelete(props.id);
              }}
            >
            <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div>
          
        </div>{
modalIsOpen?
<div>
    <Card>
        <Accordion eventKey="0">
          <Card.Body>
            <Container className="mockbody">
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              Some Content. Lorem Ipsum. Hello World.
              
            </Container>
          </Card.Body>
        </Accordion>
      </Card>
    </div>
    :null
}



      </div></div>
  );
};


// const AddMock = React.forwardRef((props, ref) => {
//   // optional re-toggling of expanded accordion
//   function handleClickToggle(eventKey) {
//     if (eventKey === props.activeKey) {
//       props.setActiveKey("");
//     } else {
//       props.setActiveKey(eventKey);
//     }
//   }

//   return (
//     <div className="row" ref={ref}>
      
//        {/* <button
//           onClick={() => handleClickToggle("0")}
//           >
//             Add Mock
//           </button> */}
//     <Accordion activeKey={props.activeKey}>
      
    //   <Card>
    //     <Accordion eventKey="0">
    //       <Card.Body>
    //         <Container className="mockbody">
    //           Some Content. Lorem Ipsum. Hello World.
    //         </Container>
    //       </Card.Body>
    //     </Accordion>
    //   </Card>
//     </Accordion>
//   </div>
//   );
// }
// );
export default Demo;
