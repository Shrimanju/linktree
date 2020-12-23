import React from "react";
import SpinnerForImage from "react-loading";

const Spinner = (props) => {
  return (
    <div>
      {props.spin ? (
        <SpinnerForImage
          type="spinningBubbles"
          color="#00BFFF"
          height={50}
          width={50}
          // timeout={3000}
        />
      ) : null}
    </div>
  );
};

export default Spinner;
