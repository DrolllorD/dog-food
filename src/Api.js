class Api {
    constructor(token){
        this.path = "https://api.react-learning.ru";
        this.group = "group-8";
        this.token = token;
    }
    signUp(body) { //регистрация
        body.group = this.group;
        return fetch(`${this.path}/signup`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
            // {"email": "maxim@mail.ru",
            // "password": "secter_pasword"}
        })
    }
    signIn(body) { //авторизация
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
            // {"email": "maxim@mail.ru",
            // "password": "secter_pasword"}
        })
    }
    pasReset(body) { //отправка токена на почту
        return fetch(`${this.path}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
            // {"email": "maxim@mail.ru"}
        })
    }
    pasChange(userId, token, body) { //изменение пароля
        return fetch(`${this.path}/password-reset/${userId}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
            // {"password": "new_secter_pasword"}
        })
    }



    getAllUsers() {//получение всех пользователей
        return fetch (`${this.path}/v2/${this.group}/users`,{
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getUserId(userId) {//получение информации о пользователе по ID
        return fetch (`${this.path}/v2/${this.group}/users/${userId}`,{
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getUser() {//получение информации о своем пользователе
        return fetch (`${this.path}/v2/${this.group}/users/me`,{
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    updUser(body, img = false) {//изменение информации о пользователе
        return fetch (`${this.path}/v2/${this.group}/users/me${img ? "/avatar" : ""}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
            // {"name": "Василий",
            // "about": "Писатель",
            // "avatar": "http://........."}
        })
    }



    getProducts() {//загрузка товаров с сервера
        return fetch (`${this.path}/products`,{
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getProduct(productId) {//загрузка конкретного товара по id с сервера
        return fetch (`${this.path}/products/${productId}`,{
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    addProduct(body) { //создание нового товара
        return fetch(`${this.path}/products`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
            // {
            // "pictures": "https://react-learning.ru/image-compressed/2.jpg", // string
            // "name": "Куриные желудочки для собак", // string, обязательное
            // "price": 450, // number, обязательное
            // "discount": 10, // number 
            // "stock": 10, // number
            // "wight": "100 г", // string
            // "description": "Описание demo", // string, обязательное
            // }
        })
    }
    changeProduct(productId, body) { //редактирование товара
        return fetch(`${this.path}/products/${productId}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
            // {//То что необходимо изменить из списка!!!
            // "pictures": "https://react-learning.ru/image-compressed/2.jpg", // string
            // "name": "Куриные желудочки для собак", // string, обязательное
            // "price": 450, // number, обязательное
            // "discount": 10, // number 
            // "stock": 10, // number
            // "wight": "100 г", // string
            // "description": "Описание demo", // string, обязательное
            // }
        })
    }
    delProduct(productId) { //удаление товара
        return fetch(`${this.path}/products/${productId}`,{
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    setLike(productId, isLike) { //поставить\удалить лайк
        return fetch(`${this.path}/products/likes/${productId}`,{
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getReviews() {//загрузить все отзывы с сервера
        return fetch (`${this.path}/products/review/`,{
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getReview(productId) {//загрузка отзывов на конкретный товар с сервера
        return fetch (`${this.path}/products/review/${productId}`,{
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    addReview(productId, body) { //оставить отзыв
        return fetch(`${this.path}/products/review/${productId}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
            // {
            //     "rating": 5,
            //     "text": "Норм товар!"
            // }
        })
    }
    delReview(productId, reviewId) { //удалить отзыв
        return fetch(`${this.path}/products/review/${productId}/${reviewId}`,{
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    
}

export {Api};