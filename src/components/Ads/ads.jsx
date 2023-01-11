/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./ads.css";

export default ({h2,p,img,colD,colL}) => {
    return <div className="ads" style={{"background": `radial-gradient(circle at 100% 100%, rgba${colL}50%, rgba${colD}50%)`}}>
        <div className="ads__content">
            <h2>{h2}</h2>
            <p>{p}</p>
        </div>
        <div className="ads__content">
            <img src={img} alt="Изображение товара" />
        </div>
    </div>
}