import React, {useState, useEffect} from "react";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer"
import Modal from "./components/Modal";
// import Search from "./components/Search/search.jsx";

import Catalog from "./pages/Catalog.jsx";
import Home from "./pages/Home.jsx";

import {Api} from "./Api";

const smiles = ["^_^", "=)", "O_o", ";(", "^_0", "@_@", "-_-", "6_6"];

const App = () => {
    const [user, setUser] = useState (localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token8"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState (new Api(token));
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        console.log("Hello!");
        console.log(token);
        if (token) {
            //загрузить данные с сервера
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setGoods(data.products);
                })
        }
    }, []); // функция отрабатывает один раз при создании компонента

    useEffect(() => {
        console.log("Change token");
        setApi(new Api(token));
        setUser(localStorage.getItem("user"));
    }, [token]);

    useEffect(() => {
        if(!user) {
            localStorage.removeItem("token8");
            setToken(null);
        }
    }, [user])

    useEffect(() => {
        if(token){
            // загрузить данные с сервера
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, [api]);

    return <>
        <div className="container">
            <Header 
                user={user} 
                setUser={setUser} 
                products={products} 
                setModalActive={setModalActive} 
            />
            <main>
                {user ? <Catalog data={goods}/> : <Home data={smiles}/>}
            </main>
            <Footer />
        </div>
        <Modal isActive={modalActive} setState={setModalActive} api={api} setToken={setToken} />
    </>
}

export default App;