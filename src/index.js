import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const Card = function(){
  return <div className="card">^_^</div>
}

ReactDOM.render(
  <>
    <h1>Hello <span className="mark">React</span>!</h1>
    <div className="box">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
  </>,
  document.querySelector("#root")
)