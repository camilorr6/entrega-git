let catalogo = document.getElementById('catalogoArticulos')



let generarCatalogo = () => {
    return (catalogo.innerHTML = productos.map((producto)=>{
        
        let {id, nombre, descripcion, precio,  inventario, img,} = producto
        
        return `
        <div id ="idProducto-${id}" class="ventanaArticuloC">
                        <img src=${img} alt="" class="fotoArticulo">
                        <a href="generico-producto.html">
                            <h3 ${nombre}</h3>
                            <p>${descripcion}/p>
                            <p>$${precio}</p>
                        </a>
                            <i onclick="reducirCantidad(${id})" class="value-button">-</i>
                            <div id=${id} class="cantidad">0</div>
                            <i onclick="aumentarCantidad(${id})"  class="value-button">+</i>
                    </div>
        `
    }).join(""))
    
}

generarCatalogo()

let aumentarCantidad = (id)=>{
    let productoSeleccionado = id

    let buscarCarrito = carrito.find((p)=>p.id === productoSeleccionado.id);

    if (buscarCarrito === undefined){
        
    carrito.push ({
        id: productoSeleccionado.id,
        item: 1,
    });
    } else {buscarCarrito.item +=1;}

    actualizarCantidad(productoSeleccionado.id)



}

let reducirCantidad = (id) =>{
    let productoSeleccionado = id

    let buscarCarrito = carrito.find((p)=>p.id === productoSeleccionado.id);

    if (search.item === 0) return;
    else {buscarCarrito.item -=1;}

    actualizarCantidad(productoSeleccionado.id)

}

let actualizarCantidad = (id) => {
    let buscarCarrito = carrito.find((p)=>p.id ===id);

    document.getElementById(id).innerHTML = buscarCarrito.item;
    
}