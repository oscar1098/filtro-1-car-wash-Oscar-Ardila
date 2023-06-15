//Botones que muestran las secciones 
const btnSecClientes = document.getElementById('btnSecClientes');
 const btnSecServi = document.getElementById('btnSecServi');

//Secciones
const seccionClientes = document.getElementById('seccionClientes');
const seccionServicios = document.getElementById('seccionServicios');
const seccionCompras = document.getElementById('seccionCompras');
const seccionPuntos = document.getElementById('seccionPuntos');

//Mostrar modulo de clientes
const mostrarClientes = () => {
    seccionClientes.classList.remove('oculSeccion');
    seccionServicios.classList.add('oculSeccion');
    seccionCompras.classList.add('oculSeccion');
    seccionPuntos.classList.add('oculSeccion');
}

//Mostrar modulo de servicios
const mostrarServicios = () => {
    seccionClientes.classList.add('oculSeccion');
    seccionServicios.classList.remove('oculSeccion');
    seccionCompras.classList.add('oculSeccion');
    seccionPuntos.classList.add('oculSeccion');
}





btnSecClientes.addEventListener('click',mostrarClientes)//Boton clientes
btnSecServi.addEventListener('click',mostrarServicios)// Boton servicios





