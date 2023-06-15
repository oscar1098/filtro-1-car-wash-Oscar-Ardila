//Traer informacion del formulario
const clientes = [];
const agregarClientes = document.getElementById('agregarClientes');
const identi = document.getElementById('identi');
const nombrePersona = document.getElementById('nombrePersona');
const apellido = document.getElementById('apellido');
const placaAuto = document.getElementById('placaAuto');
const tipoAuto = document.getElementById('tipoAuto');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
// Botones que activas las funciones
const agregarC = document.getElementById('agregarC');
const listarC = document.getElementById('listarC');
const editarC = document.getElementById('editarC');

let idClie = 0; // Id para llevar control sobre el pasajero
let puntos = 0; // Llevar control sobre los puntos

const padreTablaClientes = document.getElementById('padreTablaClientes') // Cuerpo de la tabla clientes

const buscar = document.getElementById('buscar') // tabla buscar
 
const agregarCliente = () => {

    // Validar que los inputs tengan la informacion
    if ( identi.value === '' || nombrePersona.value === '' || apellido.value === '' || placaAuto.value === '' || tipoAuto.value === '' || correo.value === '' || telefono.value === ''  ){
        alert('Ingrese la informacion del usario')
        return
    }

    // Construir el objeto con la informacion de los inputs
    const cliente = {
        id : idClie,
        identi : identi.value,
        nombrePersona : nombrePersona.value,
        apellido : apellido.value,
        placaAuto : placaAuto.value,
        tipoAuto : tipoAuto.value,
        correo : correo.value,
        telefono : telefono.value,
        puntos : puntos
    }

    idClie ++;
    clientes.push(cliente); // resetear el formulario
    agregarClientes.reset(); // Agrerar el cliente al arreglo de clientes
}

const listarClientes = () => {

    //Recorrer el arreglo de clientes

    if ( clientes.length === 0 ){   // Validar que el arreglo no este vacio
        alert('No hay clientes registrados');
        return;
    }

    padreTablaClientes.innerHTML = ''; // Vaciar el cuerpo de la tabla

    for ( let cliente of clientes ){  // Crear la tabla con el arreglo clientes

        const cuerpoTablaClientes = document.createElement('tr'); // Crear la fila
        cuerpoTablaClientes.id = 'filaCliente' 

        // el td de losbotones tiene el mismo id que el id objeto cliente
        cuerpoTablaClientes.innerHTML = `
        <tr>
          <th id='identiElim'>${cliente.identi}</th>
          <td>${cliente.nombrePersona}</td>
          <td>${cliente.apellido}</td>
          <td>${cliente.placaAuto}</td>
          <td>${cliente.tipoAuto}</td>
          <td>${cliente.correo}</td>
          <td>${cliente.telefono}</td>
          <td class = 'text-center w-25'  id='${cliente.id}'> 
            <button type="button" class="btn btn-sm btn-warning m-1 editarPasajero" id='btnEditarCliente'>Editar</button>
            <button type="button" class="btn btn-sm btn-danger m-1" id='btnEliminarCliente'>Eliminar</button>
          </td>
        </tr>
        `
        padreTablaClientes.appendChild(cuerpoTablaClientes);// Añadir el td creado al cuerpo de la tabla 
    }
}
// Funcion para encontrar el indice en el arreglo
const indiceArreglo = ( nombreId,numeroId,arreglo ) => { // Conseguir el indice del objeto en el arreglo comparando id
    
    for ( let i = 0; i < arreglo.length; i++ ){
        if ( arreglo[i][nombreId] == numeroId ){ 
            return i;
        }
    }
}

const operacionesCliente = (event) => { // Funcion del evento click de la tabla 

    let botonEvento = event.target; //Traer el boton que tuvo el evento

    if ( botonEvento.id == 'btnEliminarCliente' ){ // Encontrar el boton eliminar

        let idP =  botonEvento.parentNode.id;  // id del padre del boton que es igual al id del objeto

        let indice = indiceArreglo('id',idP,clientes); // indice del cliente a eliminar del arreglo clientes

        clientes.splice(indice,1); // Eliminar el cliente del arreglo  
        
        ( clientes.length === 0 ) ? padreTablaClientes.innerHTML = '' : listarClientes() // Actualizar el contenido de la tabla
       
    }

    if ( botonEvento.id == 'btnEditarCliente' ){ // Encontrar el boton editar

        agregarC.classList.add('ocultar'); // Ocultar boton agregar y eliminar y mostrar editar
        listarC.classList.add('ocultar');
        editarC.classList.remove('ocultar');


        let idP = botonEvento.parentNode.id; //  id del padre del boton que es igual al id del objeto
        
        let indice = indiceArreglo('id',idP,clientes);// indice del cliente en el arreglo
        console.log(indice);

        identi.value = clientes[indice].identi;  // Traer la informacion del cliente y colocarla en el input
        nombrePersona.value = clientes[indice].nombrePersona;
        apellido .value = clientes[indice].apellido;
        placaAuto.value = clientes[indice].placaAuto;
        tipoAuto.value = clientes[indice].tipoAuto;
        correo.value = clientes[indice].correo;
        telefono.value= clientes[indice].telefono;

        const editarPasajero = (event) => { // Editar pasajeros

            event.preventDefault();

            //Cambiar la informacion del cliente con los inputs
            clientes[indice].identi = identi.value;
            clientes[indice].nombrePersona =  nombrePersona.value;
            clientes[indice].apellido = apellido.value;
            clientes[indice].placaAuto = placaAuto.value;
            clientes[indice].tipoAuto = tipoAuto.value;
            clientes[indice].correo = correo.value;
            clientes[indice].telefono = telefono.value;

            listarClientes(); // Listar para ver los cambios
            agregarClientes.reset() //Limpiar el formulario

            agregarC.classList.remove('ocultar'); // Ocultar boton editar y mostrar agregar y listar
            listarC.classList.remove('ocultar');
            editarC.classList.add('ocultar');

            editarC.removeEventListener('click', editarPasajero); // Para que se ejecute la funcion una unica vez
        }
        editarC.addEventListener('click', editarPasajero); // Formulario editar pasajeros
    }
}

// Barra de buscar

buscar.addEventListener('input', e => {
    const textoBuscado = e.target.value;
  
    document.querySelectorAll('#filaCliente').forEach(fila => {
        const primeraCelda =  fila.querySelector('#identiElim');
        console.log(primeraCelda);
      const textoCelda = primeraCelda.textContent;

  
      if (textoCelda.includes(textoBuscado)) {
        fila.classList.remove('ocultar');
      } else {
        fila.classList.add('ocultar');
      }
    });
  });



agregarC.addEventListener('click',agregarCliente);// boton Agregar Clientes

listarC.addEventListener('click',listarClientes); // boton Listar Clientes

padreTablaClientes.addEventListener('click',operacionesCliente); // Localizar los botones editar y eliminar en la tabla y hacer las operaciones

// Informacion del formulario
const agregarServicio = document.getElementById('agregarServicio');
const nombrServicios = document.getElementById('nombrServicios');
const valorServicio = document.getElementById('valorServicio');
const descripcion = document.getElementById('descripcion');
const puntosFide = document.getElementById('puntosFide');
// Arreglo que almacena los servicios
const servicios = []; 
let idSer = 0; // id para llevar control sobre el arreglo

const cuerpoCompras = document.getElementById('cuerpoCompras'); // Cuerpo de compras
const listar = document.getElementById('listar'); // Boton listar


const agregarServicios = (event) => {

    event.preventDefault()

    const servicio = {
        id : idSer,
        nombrServicios : nombrServicios.value,
        valorServicio : valorServicio.value,
        descripcion : descripcion.value,
        puntosFide : puntosFide.value,
    }

    idSer ++

    servicios.push(servicio);
    agregarServicio.reset();

}



const listarServicios = () => { // listar servicios

    if ( servicios.length === 0 ){ // Se valida que el arreglo servicios no este vacio
        alert('No servicios regitrados');
        return
    }

    cuerpoCompras.innerHTML = '' // Limpiar contenido de las tarjetas

    for ( let servicio of servicios ){ // Se crean las tarjetas con el arreglo

        const tarjeta = document.createElement('div');
        
        tarjeta.innerHTML = `
        <div class="col">
        <div class="card h-100">
            <div class="card-img-top d-flex justify-content-center">
                <img src="./assets/iconoTarjeta.svg" class="card-img-top iconos">
            </div>
            <div class="card-body bg-secondary text-start">
                <h5 class="card-title">${servicio.nombrServicios}</h5>
                <p><b>ID: </b>${servicio.id}</p>
                <p><b>Valor: </b>${servicio.valorServicio}</p>
                <p><b>Descripcion: </b>${servicio.descripcion}</p>
                <p><b>Puntos fidelizacion: </b>${servicio.puntosFide}</p>
                <div class="text-center" id = ${servicio.id}>
                    <button id='btnEliminarServi' class="btn btn-danger text-black p-1">
                        eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
        `

    cuerpoCompras.appendChild(tarjeta);
    }
}


const eliminarServicio = (event) => { // Evento de las tarjetas
    event.preventDefault()
    const btnEliminarServi =  event.target; 

    if ( btnEliminarServi.id == 'btnEliminarServi' ){ // se filtra el boton eliminar del evento
        console.log('adentrpo');

        cuerpoCompras.innerHTML = '' // Se limpia la tabla

        let idD = btnEliminarServi.parentNode.id // id del td que es el mismo del objeto
        let indice = indiceArreglo('id',idD,servicios); // Indice del objeto en el arreglo

        servicios.splice(indice,1); // Se elimina el objeto de destinos

        ( servicios.length == 0 ) ? cuerpoCompras.innerHTML = '' : listarServicios(); // Actualizar la informacion de la tabla
    }
}

agregarServicio.addEventListener('submit',agregarServicios); // Agregar servicio al arrelgo
listar.addEventListener('click',listarServicios) // Listar servicios en las tarjetas
cuerpoCompras.addEventListener('click',eliminarServicio) // Evento de las tarjetas

//formulario compras
const agregarCompra = document.getElementById('agregarCompra'); 
const selectCliente = document.getElementById('selectCliente'); 
const selecServicio = document.getElementById('selecServicio'); 
const btnSecCompra = document.getElementById('btnSecCompra');
const comprar = document.getElementById('comprar');
const resumenCompra = document.getElementById('resumenCompra');

const mostrarForm = () => {

    seccionClientes.classList.add('oculSeccion');
    seccionServicios.classList.add('oculSeccion');
    seccionCompras.classList.remove('oculSeccion');
    seccionPuntos.classList.add('oculSeccion');

    selectCliente.innerHTML = '<option selected>Seleccione el cliente</option>' // Se limpia el selec de cliente
    selecServicio.innerHTML = '<option selected>Seleccione el servicio</option>' // Se limpia el selec de servicos

    for ( let cliente of clientes ){ // Se recorre el arreglo 
        
        const option = document.createElement('option'); // Se crea la etiqueta option para el selec 
        option.innerHTML = '<option>' + cliente.identi + ' ' + cliente.nombrePersona + '</option>' // se añaden el documento y nombre
        selectCliente.appendChild(option) // Se añade el option al select
    }


    for ( let servicio of servicios ){ // Se recorre el arreglo servicios
        
        const option = document.createElement('option'); // Se crea la etiqueta option para el selec de clientes
        option.innerHTML = '<option>' + servicio.nombrServicios + '</option>' // se añaden el documento y nombre
        selecServicio.appendChild(option) // Se añade el option al select
    }

}
const realizarCompra = (event) => {
    resumenCompra.innerHTML = '';
    event.preventDefault()

    if ( selectCliente.value == 'Seleccione el cliente' || selecServicio.value == 'Seleccione el servicio' ){
        alert('Seleccion el servicio y el cliente')
        return
    }

     // Declaracion del contenido de la compra
    let identificacion = '';
    let nombre = '';
    let valorCompra = 0;
    let puntosFidelizacion = 0;
    let descripcion = '';

    for ( let servicio of servicios ){// Se extrae la informacion del arreglo servicios para el resumen de la compra
        if ( servicio.nombrServicios == selecServicio.value ){
            valorCompra = parseFloat(servicio.valorServicio);
            puntosFidelizacion = parseFloat(servicio.puntosFide);
            descripcion = servicio.descripcion
        }
    }

    for ( let cliente of clientes ) { // Se extrae la informacion del arreglo clientes para el resumen de la compra
        let  textValidar = cliente.identi + ' ' + cliente.nombrePersona;
        if ( selectCliente.value.includes( textValidar) ){ // se valida que el documnto del select coincida con el de un cliente
            identificacion = cliente.identi;
            nombre = cliente.nombrePersona + ' ' + cliente.apellido;
            cliente.puntos += puntosFidelizacion; 
        }
    }

    

    tarjetaCompra = document.createElement('div'); // Se crean las tarjetas
 
    tarjetaCompra.innerHTML = `
    <div class="col">
        <div class="card h-100">
            <div class="card-img-top d-flex justify-content-center">
                <img src="./assets/iconoCompra.svg" class="card-img-top iconos">
            </div>
            <div class="card-body bg-secondary text-start">
                <p><b>Nombre: </b> ${nombre}</p>
                <p><b>Servicio: </b> ${selecServicio.value}</p>
                <p><b>Descripcion: </b> ${descripcion}</p>
                <p><b>Valor de IVA : </b> ${valorCompra*0.16}</p>
                <p><b>Valor de descuento: </b> ${valorCompra*0.06}</p>
                <p><b>Valor total: </b> ${valorCompra*1.10}</p>
            </div>
        </div>
    </div>
    
    `
    resumenCompra.appendChild(tarjetaCompra);
    agregarCompra.reset()

}

agregarCompra.addEventListener('submit',realizarCompra)


btnSecCompra.addEventListener('click',mostrarForm)


const padreTablaFidelizacion = document.getElementById('padreTablaFidelizacion');
const btnSecPuntos = document.getElementById('btnSecPuntos');

const mostrarPuntos = () => {  // Se crea la tabla de puntos

    padreTablaFidelizacion.innerHTML = '';

    seccionClientes.classList.add('oculSeccion');
    seccionServicios.classList.add('oculSeccion');
    seccionCompras.classList.add('oculSeccion');
    seccionPuntos.classList.remove('oculSeccion');
    for ( let cliente of clientes ){
    
        if ( cliente.puntos != 0 ){
    
            const tr = document.createElement('tr');
    
            tr.innerHTML= `
            <td>${cliente.nombrePersona}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.puntos}</td>
            `
            padreTablaFidelizacion.appendChild(tr);
        }
    
    }
}

btnSecPuntos.addEventListener('click',mostrarPuntos)





