/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useContext} from "react";
import Ctx from "../../Ctx";

export default ({change, close}) => {
    const {api, setToken} = useContext(Ctx);
    const [inp1, setInp1] = useState("");
    const [inp2, setInp2] = useState("");

    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            email: inp1,
            password: inp2
        }
        api.signIn(body)
            .then(res => res.ok 
                ? res.json().then(data => {
                    localStorage.setItem("user", JSON.stringify(data.data));
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                    setInp1("");
                    setInp2("");
                    close(false);
                })
                : res.status === 401 
                    ? alert(`Неверно указаны почта или пароль!`) 
                    : alert(`УПС! Ошибка с кодом ${res.status}`)
            )
    }

    return <form onSubmit={sendForm}>
        <input 
        type="email" 
        placeholder="Введите вашу почту" 
        value={inp1} 
        required
        onChange={(e) => {setInp1(e.target.value)}} 
        />
        <input 
        type="password" 
        placeholder="Пароль" 
        value={inp2} 
        onChange={(e) => {setInp2(e.target.value)}} 
        />
        <button className="btn" type="submit">Войти</button>
        <button className="btn link" type="button" onClick={() => {change(prev => !prev)}}>Зарегистрироваться</button>
    </form>
}