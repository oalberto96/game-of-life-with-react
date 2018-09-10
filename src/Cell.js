import React from "react";

const Cell = props => {
  let style = {
    border: "1px solid green",
    padding: "0",
    height: "20px",
    width: "20px",
    display: "inline-block",
    backgroundColor: props.alive && "#FF5456"
  };
  return <div style={style} onClick={props.onClick} />;
};

export default Cell;
