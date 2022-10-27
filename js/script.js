let catalogo = document.getElementById('catalogoArticulos')



let crearCatalogo = () => {
    return (catalogo.innerHTML = productos.map((producto)=>{
        
        let {id, nombre, descripcion, precio, img,} = producto
        
        let buscar= carrito.find((x)=> x.id === id) || [];

        return `
        <div id ="idProducto-${id}" class="ventanaArticuloC">
                        <img src=${img} alt="" class="fotoArticulo">
                        <a href="generico-producto.html">
                            <h3 ${nombre}</h3>
                            <p>${descripcion}/p>
                            <p>$${precio}</p>
                        </a>
                            <i onclick="reducirCantidad(${id})" class="value-button">-</i>
                            <div id=${id} class="cantidad">${buscar.item === undefined ? 0 : buscar.item}</div>
                            <i onclick="aumentarCantidad(${id})"  class="value-button">+</i>
                    </div>
        `
    }).join(""))
    
}

crearCatalogo()

let aumentarCantidad = (id)=>{
    let productoSeleccionado = id

    let buscarCarrito = carrito.find((p)=>p.id === productoSeleccionado.id);

    if (buscarCarrito === undefined){
        
    carrito.push ({
        id: productoSeleccionado.id,
        item: 1,
    });
    } else {buscarCarrito.item +=1;}

    localStorage.setItem("info", JSON.stringify(carrito))

    actualizarCantidad(productoSeleccionado.id)



}

let reducirCantidad = (id) =>{
    let productoSeleccionado = id

    let buscarCarrito = carrito.find((p)=>p.id === productoSeleccionado.id);

    if(buscarCarrito === undefined) return;
    else if (buscarCarrito.item === 0) return;
    else {buscarCarrito.item -=1;}

    carrito = carrito.filter((p)=>p.item !== 0)

    actualizarCantidad(productoSeleccionado.id)

    localStorage.setItem("info", JSON.stringify(carrito))

}

let actualizarCantidad = (id) => {
    let buscarCarrito = carrito.find((p)=>p.id ===id);

    document.getElementById(id).innerHTML = buscarCarrito.item;

    calculo()
    
}

let calculo = ()=>{
    let cantidadCarrito = document.getElementById("cantidadCarrito");

    cantidadCarrito.innerHTML = carrito.map((x)=>x.item).reduce((x,y)=>x+y, 0)
     
}

calculo()