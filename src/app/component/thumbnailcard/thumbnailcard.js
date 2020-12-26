import React, { useState, useEffect, useRef } from "react";
import Class1 from "../thumbnailcard/thumbnailcard.css";
import './thumbnailcard.css';
import { Avatar } from "@material-ui/core";
import { Container, Card, Accordion, Button } from "react-bootstrap";


const Thumbcard = () => {


  return (
    <div className="thumba">
                    <div  className="avatar">
                  <Avatar
                 
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#000000",
                      border: "1px solid #d8d7de",
                      borderRadius: "100px",
                    }}
                  />
                  </div>
                  <div className="thumbnail">
                    <Button style={{ backgroundColor: "lightgreen", }}
                     className="thumbnailbutton"
                    >
                      Upload Image
                      </Button>

                      <Button style={{ backgroundColor: "#FF0000", }}
                    className="thumbnailbutton">
                      Remove Image
                      </Button>

                      </div>
                 
    </div>
  );
};

export default Thumbcard;
