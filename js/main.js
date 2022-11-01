let catalogo = document.getElementById('catalogoArticulos')

let carrito = JSON.parse(localStorage.getItem("info")) || []



let crearCatalogo = () => {
    return (catalogo.innerHTML = productos.map(({id, nombre, descripcion, precio, img,})=>{
        

        let buscarProducto = carrito.find((p)=>p.id === id) 
        
        return `
                    <div  id ="idProducto-${id}" class="card" style="width: 16rem;">
                    <img class="card-img-top" src="${img}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${nombre}</h5>
                      <p class="card-text">${descripcion}</p>
                    </div>
                    <div class="card-body">
                    <p>$${precio}</p>
                    <div class="d-flex">
                      <button onclick="reducirCantidad(${id})" class="btn value-button">-</button>
                      <div id=${id} class="cantidad">${buscarProducto === undefined ? 0 : buscarProducto.item}</div>                      
                            <button onclick="aumentarCantidad(${id})"  class="btn value-button">+</i>
                    </div>
                    </div>
                  </div>

        `
    }).join(""))
    
}
   
crearCatalogo()

let aumentarCantidad = (id)=>{

    let productoSeleccionado = id

    let buscarProducto = carrito.find((p)=>p.id === productoSeleccionado);

        if (buscarProducto === undefined){
        carrito.push ({
            id: productoSeleccionado,
            item: 1,
        });

        }else {buscarProducto.item +=1;}

    calculo()
    
    localStorage.setItem("info", JSON.stringify(carrito))

    crearCatalogo()

}

let reducirCantidad = (id) =>{
    let productoSeleccionado = id

    let buscarProducto = carrito.find((p)=>p.id === productoSeleccionado);

    if(buscarProducto === undefined) return;
    else if (buscarProducto.item === 0) return;
    else {buscarProducto.item -=1;}

    calculo()

    carrito = carrito.filter((p)=>p.item !== 0)

    localStorage.setItem("info", JSON.stringify(carrito))

    crearCatalogo()

}

let calculo = ()=>{
    let cantidadCarrito = document.getElementById("cantidadCarrito");

    cantidadCarrito.innerHTML = carrito.map((x)=>x.item).reduce((x,y)=>x+y, 0)
     
}

calculo()