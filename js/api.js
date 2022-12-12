class Store {
    constructor() {
        this.products = [];
    }
    getProducts() {
        return this.products;
    }
    getWomen() {
        fetch("https://fakestoreapi.com/products/category/women's clothing")
            .then(res=>res.json())
            .then(json=>{
                this.products = [];
                this.products.push(json)
            })
    }
    getMen() {
        fetch("https://fakestoreapi.com/products/category/men's clothing")
            .then(res=>res.json())
            .then(json=>{
                this.products = [];
                this.products.push(json)
            })
    }
    getAccesories() {
        fetch("https://fakestoreapi.com/products/category/jewelery")
            .then(res=>res.json())
            .then(json=>{
                this.products = [];
                this.products.push(json)
            })
        // fetch("https://fakestoreapi.com/products/category/electronics")
        // .then(res=>res.json())
        // .then(json=>{
        //     this.products.push(json)
        // })
    }
    
}
// exportar
export {Store}