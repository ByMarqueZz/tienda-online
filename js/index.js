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
    let logo = document.getElementById("headerLeft");
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
    let btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", function () {
        if (btnLogin.innerHTML != "Login") {
            btnLogin.innerHTML = "Login";
        }
        viewLogin(store);
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
            <p>${Math.round(((products[i].price * products[i].quantity) * 100)) / 100}€</p>
            <p>
                Cantidad: ${products[i].quantity}
                <button id="btnMas${i}">+</button>
                <button id="btnMenos${i}">-</button>
            </p>
            <button id="btnRemove${i}">Eliminar</button>
        `;
        display.appendChild(div);
        // botones por cada producto
        let btnRemove = document.getElementById("btnRemove"+i);
        btnRemove.addEventListener("click", function () {
            cart.remove(products[i]);
            loadCart(cart);
        });
        let btnMas = document.getElementById("btnMas"+i);
        btnMas.addEventListener("click", function () {
            cart.items[i].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart.items));
            loadCart(cart);
        });
        let btnMenos = document.getElementById("btnMenos"+i);
        btnMenos.addEventListener("click", function () {
            if(cart.items[i].quantity > 1) {
                cart.items[i].quantity--;
                localStorage.setItem("cart", JSON.stringify(cart.items));
                loadCart(cart);
            } else {
                cart.remove(products[i]);
                loadCart(cart);
            }
        });
    }
    let h2fixed = document.getElementById("h2fixed");
    h2fixed.addEventListener("click", function () {
        viewCart(cart);
    });
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
// LOGIN
function loginTry(store) {
    store.getUsers()
    .then(res=>res.json())
    .then(json=>{
        let users = json;
        let usuario = document.getElementById("usuarioForm").value;
        let password = document.getElementById("contrasenaForm").value;
        let user = users.find(user => user.username == usuario && user.password == password);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            viewHome();
            document.getElementById('btnLogin').innerHTML = "Bienvenido " + user.username;
        } else {
            viewLogin(store);
        }
    })
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
function viewLogin(store) {
    let divPrincipal = document.getElementById("vistas");
    divPrincipal.innerHTML = '';
    let divLogin = document.createElement("div");
    divLogin.id = "loginDiv";
    divLogin.innerHTML = `
        <h2>LOGIN</h2>
        <form action="">
            <input type="text" placeholder="Usuario" id="usuarioForm">
            <input type="password" placeholder="Contraseña" id="contrasenaForm">
            <button id="loginForm">Entrar</button>
        </form>
    `;
    divPrincipal.appendChild(divLogin);
    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("click", function () {
        loginTry(store);
    });
}

function viewCart(cart) {
    let products = cart.getItems();
    let divPrincipal = document.getElementById("vistas");
    divPrincipal.innerHTML = '';
    let divCart = document.createElement("div");
    divCart.id = "cartDiv";
    divCart.innerHTML += `<h2>CARRITO</h2>`;
    let table = document.createElement("table");
    table.className = "cartTable";
    for(let i = 0; i < products.length; i++) {
        table.innerHTML += `
            <tr>
                <td class="cartImg"><img src="${products[i].image}" alt="${products[i].title}" class="cartImg"></td>
                <td class="cartTitle">${products[i].title}</td>
                <td class="cartPrice">${products[i].price}€</td>
                <td class="cartQuantity">
                    Cantidad: ${products[i].quantity}
                    <button id="btnMasCart${i}">+</button>
                    <button id="btnMenosCart${i}">-</button>
                </td>
                <td class="cartTotal">Total: ${products[i].price * products[i].quantity}€</td>
                <td class="cartRemove"><button id="btnRemoveCart${i}">Eliminar</button></td>
            </tr>
        `;
    }
    divCart.appendChild(table);
    let total = cart.getTotal();
    divCart.innerHTML += '<p id="totalCart">Total: ' + total + '€</p>';
    divPrincipal.appendChild(divCart);   
    // botones de eliminar y de aumentar y disminuir cantidad
    for (let i = 0; i < products.length; i++) {
        let btnRemove = document.getElementById("btnRemoveCart"+i);
        btnRemove.addEventListener("click", function () {
            cart.remove(products[i]);
            viewCart(cart);
        });
        let btnMas = document.getElementById("btnMasCart"+i);
        btnMas.addEventListener("click", function () {
            cart.items[i].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart.items));
            viewCart(cart);
        });
        let btnMenos = document.getElementById("btnMenosCart"+i);
        btnMenos.addEventListener("click", function () {
            if(cart.items[i].quantity > 1) {
                cart.items[i].quantity--;
                localStorage.setItem("cart", JSON.stringify(cart.items));
                viewCart(cart);
            } else {
                cart.remove(products[i]);
                viewCart(cart);
            }
        }); 
    }
}