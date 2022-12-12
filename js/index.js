import { Store } from "./api.js";

window.onload = function () {
    viewHome();
    addEvent();
}
// FUNCIONES SUELTAS
function addEvent() {
    let store = new Store();
    let logo = document.getElementById("logoHeader");
    logo.addEventListener("click", viewHome);
    let btnMujer = document.getElementById("btnMujer");
    btnMujer.addEventListener("click", function () {
        store.getWomen();
        document.getElementById("GIF").style.display = "block";
        document.body.style.opacity = "0.5";
        setTimeout(function () {
            let products = store.getProducts();
            viewProducto(products);
            document.getElementById("GIF").style.display = "none";
            document.body.style.opacity = "1";
        }, 4000);
    });
    let btnHombre = document.getElementById("btnHombre");
    btnHombre.addEventListener("click", function () {
        store.getMen();
        document.getElementById("GIF").style.display = "block";
        document.body.style.opacity = "0.5";
        setTimeout(function () {
            let products = store.getProducts();
            viewProducto(products);
            document.getElementById("GIF").style.display = "none";
            document.body.style.opacity = "1";
        }, 4000);
        
    });
    let btnAccesorios = document.getElementById("btnAccesorios");
    btnAccesorios.addEventListener("click", function () {
        store.getAccesories();
        document.getElementById("GIF").style.display = "block";
        document.body.style.opacity = "0.5";
        setTimeout(function () {
            let products = store.getProducts();
            viewProducto(products);
            document.getElementById("GIF").style.display = "none";
            document.body.style.opacity = "1";
        }, 4000);
    });
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

function viewProducto(products) {
    let divPrincipal = document.getElementById("vistas");
    divPrincipal.innerHTML = '';
    let productsDiv = document.createElement("div");
    productsDiv.className = "products";
    for (let i = 0; i < products[0].length; i++) {
        productsDiv.innerHTML += `
            <div class="product">
                <img src="${products[0][i].image}" alt="${products[0][i].title}" class="productImg">
                <div class="productInfo">
                    <h3 class="productTitle">${products[0][i].title}</h3>
                    <p class="productPrice">$${products[0][i].price}</p>
                </div>
            </div>
        `;
    }
    divPrincipal.appendChild(productsDiv);
}

