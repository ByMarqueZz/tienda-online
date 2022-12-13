class Store {
    constructor() {
        this.products = [];
    }
    getProducts() {
        return this.products;
    }
    getWomen() {
        return fetch("https://fakestoreapi.com/products/category/women's clothing")
        }
    getMen() {
        return fetch("https://fakestoreapi.com/products/category/men's clothing")
    }
    getAccesories() {
        return fetch("https://fakestoreapi.com/products/category/jewelery")
    }
    getDesc(category) {
        return fetch('https://fakestoreapi.com/products/category/'+category+'?sort=desc')
    }
    getAsc(category) {
        return fetch('https://fakestoreapi.com/products/category/'+category+'?sort=asc')
    }
    getUsers() {
        return fetch('https://fakestoreapi.com/users')
    }
}
export {Store}