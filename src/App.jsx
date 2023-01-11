import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer"
import Modal from "./components/Modal";
// import Search from "./components/Search/search.jsx";

import Catalog from "./pages/Catalog.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product";

import {Api} from "./Api";

const App = () => {
    const [user, setUser] = useState (localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token8"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState (new Api(token));
    const [resize, setResize] = useState (false);
    const [goods, setGoods] = useState([]);
    const [visibleGoods, setVisibleGoods] = useState(goods);
    const arrColorSaturation = [20,40,60,80,100,120,140,160,180,200];
    const [arrObjAds, setArrObjAds] = useState([{h2:"Микс масел", p:"пищевая здоровая натуральная добавка", img:"https://crimea-nature.com/uploads/2020/12/maslo-plus-v-ryad-size-1-1000x737-1.png"},{h2:"Наборы от 840 ₽", p:"для дрессировки", img:"https://static.insales-cdn.com/r/EOeQXbuL5TU/rs:fit:1000:0:1/plain/images/products/1/782/80397070/226x1000_lamb_round_chip.png"},{h2:"Рога северного оленя", p:"от 10 до 30 кг", img:"https://amiel.club/uploads/posts/2022-03/1647756230_35-amiel-club-p-roga-olenya-kartinki-49.png"},{h2:"Слипы из шеи индейки", p:"100% натуральное", img:"https://spar-online.ru/upload/iblock/115/qcvrilcamy1eursyjm7z498kvyo16bmy.png"}]);

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
            console.log(e);
            console.log(resize);
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

    return <>
        <div className="container">
            <Header 
                user={user} 
                setUser={setUser} 
                // products={products} 
                goods = {goods}
                searchGoods = {setVisibleGoods}
                setModalActive={setModalActive} 
            />
            <main>
                {/* {user ? <Catalog data={goods}/> : <Home data={smiles}/>} */}
                <Routes>
                    <Route path="/" element={<Home data={products} arrObjAds={arrObjAds} resize={resize}/>} />
                    <Route path="/catalog" element={<Catalog data={visibleGoods} />} />
                    <Route path="/profile" element={<Profile setUser={setUser} user={user} />} />
                    <Route path="/catalog/:id" element={<Product />} />
                </Routes>
            </main>
            <Footer />
        </div>
        <Modal isActive={modalActive} setState={setModalActive} api={api} setToken={setToken} />
    </>
}

export default App;