const buscadorDeAlcohol = async () => {
    let resultado = await fetch("./data.json")
    let data = await resultado.json()

    const agregarEvento = (idBoton, nombreProducto) =>{
        document.getElementById(idBoton).addEventListener("click",() =>{
            let producto = data.find (p => p.nombre === nombreProducto)
            if(producto){
                agregarCarrito(producto.nombre, producto.precio)
            }
        })
    }


    agregarEvento("agregar-fernet", "Fernet")
    agregarEvento("agregar-vodka", "Vodka")
    agregarEvento("agregar-vino", "Vino")
    agregarEvento("agregar-ron", "Ron")
    agregarEvento("agregar-whisky", "Whisky")
    agregarEvento("agregar-gin", "Gin")
    agregarEvento("agregar-chandon", "Chandon")
    agregarEvento("agregar-hielo", "Hielo")
}

buscadorDeAlcohol()

let carrito = []
let total = 0

const tbody = document.querySelector(".carrito tbody")
const precio = document.getElementById("precio")

function agregarCarrito(nombre,precio){
    carrito.push({nombre,precio})
    total += precio

    Swal.fire({
        icon: "success",
        title: "Se agrego al Carrito",
        showConfirmButton: false,
        timer: 1500
    });


    actualizarContador()
    actualizarCarrito()
}



function vaciarCarrito() {
    carrito.splice(0, carrito.length) 
    total = 0;

    actualizarCarrito();
}

document.querySelector(".botones .vaciar").addEventListener("click", vaciarCarrito);

function contarProductosEnCarrito() {
    return carrito.length;
}

document.querySelector(".cuenta",contarProductosEnCarrito)

function finalizarCompra(){
    if(total === 0){
        Swal.fire({
            icon: "error",
            title: "El carrito esta vacio",
            showConfirmButton: false,
        });
    }else{
        Swal.fire({
            icon: "success",
            title: "Finalizaste la compra,Muchas gracias",
            showConfirmButton: false,
            text:`total a pagar $${total}`
        });
        
    }

    
    
    actualizarContador()
    vaciarCarrito()
}

document.querySelector(".botones .finalizar").addEventListener("click", finalizarCompra)


function actualizarContador() {
    const contadorElement = document.querySelector('.cuenta');
    contadorElement.textContent = carrito.length; 
    
}




function actualizarCarrito (){
    tbody.innerHTML = ``;

    carrito.forEach(producto => {
        const fila = `<tr><td>${producto.nombre}</td><td>$${producto.precio}</td></tr>`
        tbody.innerHTML += fila        
    });

    precio.textContent = `$${total}`;

    
}


vaciarCarrito()