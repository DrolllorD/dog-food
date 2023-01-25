/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React, {useContext} from "react";
import Ctx from "../Ctx";

export default () => {
    const {user} = useContext(Ctx);
    return <>
        <h1>Личный кабинет</h1>
        <p>Привет, {user && user.name}!</p>
    </>
}