window.onload = function () {
    viewHome();
    let logo = document.getElementById("logoHeader");
    logo.addEventListener("click", viewHome);
}

function viewHome() {
    let divPrincipal = document.getElementById("vistas");
    divPrincipal.innerHTML += `
        <div class="sloganDiv">
            <img src="./img/slogan.png" alt="slogan" class="slogan">
        </div>
    `;
}
