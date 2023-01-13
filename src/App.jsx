import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import "./style.css";
import products from "./assets/data.json";
import ads from "./assets/ads.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer"
import Modal from "./components/Modal";
// import Search from "./components/Search/search.jsx";

import Catalog from "./pages/Catalog.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product";

import {Api} from "./Api";
import Ctx from "./Ctx";

const App = () => {
    const [user, setUser] = useState (localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token8"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState (new Api(token));
    const [resize, setResize] = useState (false);
    const [goods, setGoods] = useState([]);
    const [visibleGoods, setVisibleGoods] = useState(goods);
    const arrColorSaturation = [20,40,60,80,100,120,140,160,180,200];
    const [arrObjAds, setArrObjAds] = useState(ads);

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
    }, [api])

    useEffect(() => {
        setVisibleGoods(goods);
    }, [goods])

    return <Ctx.Provider value={{
        user: user,
        token: token,
        api: api,
        setUser: setUser,
        setToken: setToken,
        setApi: setApi
    }}>
        <div className="container">
            <Header 
                resize={resize}
                // products={products} 
                goods = {goods}
                searchGoods = {setVisibleGoods}
                setModalActive={setModalActive} 
            />
            <main>
                {/* {user ? <Catalog data={goods}/> : <Home data={smiles}/>} */}
                <Routes>
                    <Route path="/dog-food/" element={<Home data={products} arrObjAds={arrObjAds} resize={resize}/>} />
                    <Route path="/dog-food/catalog" element={<Catalog data={visibleGoods} />} />
                    <Route path="/dog-food/profile" element={<Profile/>} />
                    <Route path="/dog-food/catalog/:id" element={<Product />} />
                </Routes>
            </main>
            <Footer resize={resize} />
        </div>
        <Modal isActive={modalActive} setState={setModalActive} />
    </Ctx.Provider>
}

export default App;