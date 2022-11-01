let estadoCarrito = document.getElementById("estadoCarrito")

let articuloCarrito = document.getElementById("articuloCarrito")

let carrito = JSON.parse(localStorage.getItem("info")) || []

let calculo = ()=>{
    let cantidadCarrito = document.getElementById("cantidadCarrito");

    cantidadCarrito.innerHTML = carrito.map((x)=>x.item).reduce((x,y)=>x+y, 0)
     
}

calculo()

console.log(carrito)

let generarCarrito= ()=>{
    if(carrito.length !== 0){
        return (articuloCarrito.innerHTML= carrito.map((articulo)=>{
        let {id, item} = articulo

        let buscar = productos.find((x)=>x.id === id) || []

        let buscarProducto = carrito.find((p)=>p.id === id) 
            return `

            <div class="col-3 mb-2 ">
        <img class="w-50" src="${buscar.img}" alt="art image">
      </div>
      <div class="col-5 mb-2 ">
        <h6 class="">${buscar.nombre}</h6>
        <p class="pl-1 mb-0">$ ${buscar.precio}</p>
        <div class="pl-1 mb-0">
        <button type="button" class="btn btn-danger">Eliminar</button>
        </div>
      </div>
      <div class="col-2 d-flex">
      <button onclick="reducirCantidad(${id})" class="btn value-button">-</button>
      <div id=${id} class="cantidad">${buscarProducto === undefined ? 0 : buscarProducto.item}</div>                      
            <button onclick="aumentarCantidad(${id})"  class="btn value-button">+</i>
      </div>
      <div class="col-2">
        <p id="cartItem1Price">$66</p>
      </div>
      <hr class="division">

            `
    }).join(" "));
    } else {

        articuloCarrito.innerHTML= `


        `

    estadoCarrito.innerHTML = `
        <h2>Tu carrito está vacio</h2>
        <a href="catalogo.html">
            <button class="btn btn-lg btn-primary">Volver al Catálogo</button>
        </a>

        `
    }
}

generarCarrito()