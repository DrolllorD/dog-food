import React from "react";

export default React.createContext({
    user: "",
    token: "",
    api: {},
    modalActive: false,
    goods: [],
    visibleGoods: [],
    resize: false,
    arrObjAds: [],
    products: [],
    favourites: [],
    setFavourites: () => {},
    ending: () => {},
    setArrObjAds: () => {},
    setResize: () => {},
    setVisibleGoods: () => {},
    setGoods: () => {},
    setModalActive: () => {},
    setUser: () => {},
    setToken: () => {},
    setApi: () => {}
});