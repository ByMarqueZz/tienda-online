import { Store } from "./api.js";
import { Cart } from "./cart.js";

window.onload = function () {
    viewHome();
    addEvent();
}
// FUNCIONES SUELTAS
function addEvent() {
    // Añade los eventos a los botones
    let store = new Store();
    let cart = new Cart();
    cart.loadtemsForLocalStorage();
    let logo = document.getElementById("logoHeader");
    logo.addEventListener("click", viewHome);
    let btnMujer = document.getElementById("btnMujer");
    btnMujer.addEventListener("click", function () {
        chargePetition(store.getWomen, store, cart, "women's clothing");
    });
    let btnHombre = document.getElementById("btnHombre");
    btnHombre.addEventListener("click", function () {
        chargePetition(store.getMen, store, cart, "men's clothing");
    });
    let btnAccesorios = document.getElementById("btnAccesorios");
    btnAccesorios.addEventListener("click", function () {
        chargePetition(store.getAccesories, store, cart, "jewelery");
    });
    let btnCartDisplay = document.getElementById("carroHeader");
    btnCartDisplay.addEventListener("click", function () {
        displayCart(cart);
    });
}

function chargePetition(metodo, store, cart, category="") {
    /*SE ENCARGA DE LLAMAR UN METODO DE LA API SEGÚN LA VISTA QUE QUIERAS */

    document.getElementById("GIF").style.display = "block";
    document.body.style.opacity = "0.5";
    metodo(category).then(res=>res.json())
    .then(json=>{
        store.products = [];
        store.products.push(json);
        viewProductos(store.getProducts(), store, cart, category);
        document.getElementById("GIF").style.display = "none";
        document.body.style.opacity = "1";
    })
}

function addEventView(products, store, cart, category="") {
    /*AÑADE EVENTOS UNA VEZ CARGADA LA VISTA DE PRODUCTOS */

    // obtengo todos los productos y les agrego el evento
    let product = document.getElementsByClassName("product");
    for (let i = 0; i < product.length; i++) {
        product[i].addEventListener("click", function () {
            viewProducto(products[0][i], cart);
        });
    }
    // obtengo los botones de filtrado y les agrego el evento
    let btnDesc = document.getElementById("btnDesc");
    btnDesc.addEventListener("click", function () {
        chargePetition(store.getDesc, store, cart, category);
    });
    let btnAsc = document.getElementById("btnAsc");
    btnAsc.addEventListener("click", function () {
        chargePetition(store.getAsc, store, cart, category);
    });
}

function displayCart(cart) {
    let display = document.getElementById("displayCart");
    if (display.style.display == "block") {
        display.style.display = "none";
    } else {
        display.style.display = "block";
    }
    loadCart(cart);
}

function loadCart(cart) {
    let products = cart.getItems();
    let display = document.getElementById("displayCart");
    display.innerHTML = '<h2 id="h2fixed">Tu carrito</h2><p id="pfixed" class="total">Total: '+cart.getTotal()+'€</p>';
    for (let i = 0; i < products.length; i++) {
        let div = document.createElement("div");
        div.className = "productCart";
        div.innerHTML = `
            <img src="${products[i].image}" alt="${products[i].title}" class="imgInCart">
            <p>${products[i].title}</p>
            <p>${(products[i].price * products[i].quantity)}€</p>
            <p>Cantidad: ${products[i].quantity}</p>
            <button id="btnRemove${i}">Eliminar</button>
        `;
        display.appendChild(div);
        let btnRemove = document.getElementById("btnRemove"+i);
        btnRemove.addEventListener("click", function () {
            cart.remove(products[i]);
            loadCart(cart);
        });
    }
}

function animationCart() {
    let carro = document.getElementById("carroHeader");
    carro.style.backgroundColor = "green";
    document.getElementById("animationAddCart").style.display = "block";
    setTimeout(function () {
        carro.style.backgroundColor = "white";
        document.getElementById("animationAddCart").style.display = "none";
    }, 1500);
}

// VISTAS
function viewHome() {
    let divPrincipal = document.getElementById("vistas");
    divPrincipal.innerHTML = `
        <div class="sloganDiv">
            <img src="./img/slogan.png" alt="slogan" class="slogan">
        </div>
    `;
}

function viewProductos(products, store, cart, category) {
    let divPrincipal = document.getElementById("vistas");
    divPrincipal.innerHTML = '';
    let divBotones = document.createElement("div");
    divBotones.className = "buttonFilter";
    divBotones.innerHTML = `
        <button id="btnDesc">Desc</button>
        <button id="btnAsc">Asc</button>
    `;
    let productsDiv = document.createElement("div");
    productsDiv.className = "products";
    
    for (let i = 0; i < products[0].length; i++) {
        productsDiv.innerHTML += `
            <div class="product">
                <div class="productImgDiv">
                    <img src="${products[0][i].image}" alt="${products[0][i].title}" class="productImg">
                </div>
                <div class="productInfo">
                    <h3 class="productTitle">${products[0][i].title}</h3>
                    <p class="productPrice">$${products[0][i].price}</p>
                </div>
            </div>
        `;
    }
    divPrincipal.appendChild(divBotones);
    divPrincipal.appendChild(productsDiv);
    addEventView(products, store, cart, category);
}

function viewProducto(product, cart) {
    let divPrincipal = document.getElementById("vistas");
    divPrincipal.innerHTML = '';
    let productDiv = document.createElement("div");
    productDiv.className = "productDetails";
    productDiv.innerHTML = `
        <div class="divImagenLeft">
            <img src="${product.image}" alt="${product.title}" class="productImgDetails">
        </div>
        <div class="productInfoDetails">
            <h3 class="productTitle">${product.title}</h3>
            <p class="productPrice">$${product.price}</p>
            <p class="productDescription">${product.description}</p>
            <button class="btnAddCart">AGREGAR AL CARRITO</button>
        </div>
    `;
    divPrincipal.appendChild(productDiv);
    // añadimos el evento de agregar al carrito
    let btnAddCart = document.getElementsByClassName("btnAddCart")[0];
    btnAddCart.addEventListener("click", function () {
        cart.add(product);
        loadCart(cart);
        animationCart();
    });
}
