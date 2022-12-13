class Cart {
    constructor() {
        this.items = [];
    }
    
    add(item) {
        let itemExists = this.items.find(i => i.id === item.id);
        if (itemExists) {
            itemExists.quantity++;
        } else {
            let nuevoItem = item;
            nuevoItem.quantity = 1;
            this.items.push(nuevoItem);
        }
        localStorage.setItem("cart", JSON.stringify(this.items));
    }

    getTotal() {
        let total = 0;
        for (let i=0; i < this.items.length; i++) {
            total += this.items[i].price * this.items[i].quantity;
        }
        total = Math.round(total * 100) / 100;
        return total;
    }
    
    remove(item) {
        this.items = this.items.filter(i => i !== item);
        localStorage.setItem("cart", JSON.stringify(this.items));
    }
    
    getItems() {
        return this.items;
    }
    loadtemsForLocalStorage() {
        let products = JSON.parse(localStorage.getItem("cart"));
        if (products) {
            for (let i=0; i < products.length; i++) {
                for (let j=0; j < products[i].quantity; j++) {
                    this.add(products[i]);
                }

            }
        }
    }
}

export { Cart }