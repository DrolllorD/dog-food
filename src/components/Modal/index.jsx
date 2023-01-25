/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useContext} from "react";
import "./style.css";

import Signup from "./Signup";
import Login from "./Login";
import Ctx from "../../Ctx";

export default () => {
    const {modalActive, setModalActive} = useContext(Ctx);
    const [auth, setAuth] = useState(true);
    let style = {
        display: modalActive && "flex"
        // display: isActive ? "flex" : "none"
    }
    return <div className="modal-container" style={style}>
        <div className="modal">
            <div className="modal-close" onClick={() => setModalActive(false)} ><i class="fa-solid fa-xmark"></i></div>
            <h2>{auth ? "Войти" : "Зарегистрироваться"}</h2>
            {auth 
            ? <Login change={setAuth} close={setModalActive}/> 
            : <Signup change={setAuth} close={setModalActive}/>}
        </div>
    </div>
}