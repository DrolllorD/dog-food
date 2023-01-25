import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import products from "./assets/data.json";
import ads from "./assets/ads.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer"
import Modal from "./components/Modal";

import Catalog from "./pages/Catalog.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product";
import AddForm from "./pages/AddForm";
import Favourites from "./pages/Favourites";

import {Api} from "./Api";
import Ctx from "./Ctx";

const App = () => {
    let usr = localStorage.getItem("user");
    if(usr) {
        usr = JSON.parse(usr);
    }
    const [user, setUser] = useState (usr);
    const [token, setToken] = useState(localStorage.getItem("token8"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState (new Api(token));
    const [resize, setResize] = useState (false);
    const [goods, setGoods] = useState([]);
    const [visibleGoods, setVisibleGoods] = useState(goods);
    const arrColorSaturation = [20,40,60,80,100,120,140];
    const [arrObjAds, setArrObjAds] = useState(ads);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        if (token) {
            //загрузить данные с сервера
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, []); // функция отрабатывает один раз при создании компонента

    useEffect(() => {
        for(let i = 0; i < arrObjAds.length; i++) {
            arrObjAds.push(...arrObjAds.splice((Math.floor(Math.random()*arrObjAds.length)),1));
        }
        for(let i = 0; i < arrObjAds.length; i++){
            let r = arrColorSaturation[Math.floor(Math.random()*arrColorSaturation.length)];
            let g = arrColorSaturation[Math.floor(Math.random()*arrColorSaturation.length)];
            let b = arrColorSaturation[Math.floor(Math.random()*arrColorSaturation.length)];
            arrObjAds[i].colorDark=`(${r},${g},${b})`;
            arrObjAds[i].colorLight=`(${r+40},${g+40},${b+40})`;
            setArrObjAds(arrObjAds);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", (e) => {
            if(e.currentTarget.innerWidth <= 1000){
                setResize(true);
            }else{
                setResize(false);
            }
        })
    }, []);

    useEffect(() => {
        setApi(new Api(token));
        let usr = localStorage.getItem("user");
        if(usr) {
            usr = JSON.parse(usr);
        }
        setUser(usr);
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
    }, [api])

    useEffect(() => {
        setVisibleGoods(goods);
        setFavourites(goods.filter(el => {
            el.likes.includes(user._id);
        }))
    }, [goods])
    const ending = (num) => {
        let con = num.length.toString();
        if ((+con[con.length - 1] === 1) && (+con[con.length - 2] !== 1)){
            return ["", ""];
        } else if ((+con[con.length - 1] > 1) && (+con[con.length - 1] < 5) && (+con[con.length - 2] !== 1)) {
            return ["о", "а"];
        } else {
            return ["о", "ов"];
        }
    }
    return <Ctx.Provider value={{
        user: user,
        token: token,
        api: api,
        modalActive: modalActive,
        goods: goods,
        visibleGoods: visibleGoods,
        resize: resize,
        arrObjAds: arrObjAds,
        products: products,
        favourites: favourites,
        setUser: setUser,
        setToken: setToken,
        setApi: setApi,
        setModalActive: setModalActive,
        setGoods: setGoods,
        setVisibleGoods: setVisibleGoods,
        setResize: setResize,
        setArrObjAds: setArrObjAds,
        setFavourites: setFavourites,
        ending: ending
    }}>
        <div className="wrapper">
            <Header/>
            <main>
                {/* {user ? <Catalog data={goods}/> : <Home data={smiles}/>} */}
                <Routes>
                    <Route path="/dog-food/" element={<Home/>} />
                    <Route path="/dog-food/catalog" element={<Catalog/>} />
                    <Route path="/dog-food/profile" element={<Profile/>} />
                    <Route path="/dog-food/catalog/:id" element={<Product/>} />
                    <Route path="/dog-food/add" element={<AddForm/>} />
                    <Route path="/dog-food/favourites" element={<Favourites/>} />
                </Routes>
            </main>
            <Footer/>
        </div>
        <Modal/>
    </Ctx.Provider>
}

export default App;