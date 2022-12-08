class ViewController {
    // funcion
    cargarVistaHome() {
        let boton = document.getElementById('logoHeader');
        boton.addEventListener('click', () => {
            document.getElementById('vistas').innerHTML = '<object type="text/html" data="./views/home.html" ></object>';
        });
    }
}

export { ViewController };