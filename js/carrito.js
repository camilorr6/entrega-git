let estadoCarrito = document.getElementById("estadoCarrito")

let articuloCarrito = document.getElementById("articuloCarrito")

let carrito = JSON.parse(localStorage.getItem("info")) || []

//suma la cantidad  de cada item y lo plasma 
let calculo = ()=>{
    let cantidadCarrito = document.getElementById("cantidadCarrito");

    cantidadCarrito.innerHTML = carrito.map((x)=>x.item).reduce((x,y)=>x+y, 0)
     
}

calculo()

let generarCarrito= ()=>{
    fetch("../productos.json")
    .then (function(resp){
        return resp.json()
    })
    .then(function(productos){
            //creando tarjetas para cada producto en carrito
        if(carrito.length !== 0){
            return (       
                articuloCarrito.innerHTML= carrito.map((articulo)=>{
            let {id, item} = articulo
    
            let buscar = productos.find((x)=>x.id === id) || []
    
            let buscarProducto = carrito.find((p)=>p.id === id) 
            //calcula el precio de cada producto
            let sumaProducto= buscar.precio*buscarProducto.item
                return `
    
                <div class="col-3 mb-2 ">
            <img class="w-50" src="${buscar.img}" alt="art image">
          </div>
          <div class="col-5 mb-2 ">
            <h6 class="">${buscar.nombre}</h6>
            <p class="pl-1 mb-0">$ ${buscar.precio}</p>
            <div class="pl-1 mb-0">
            <button type="button" class="btn btn-danger mb-2 mx-auto" onclick="eliminarProducto(${id})">Eliminar</button>
            </div>
          </div>
          <div class="col-2 d-flex">
          <button onclick="reducirCantidad(${id})" class="btn value-button">-</button>
          <div id=${id} id="cantidad" class="cantidad">${buscarProducto === undefined ? 0 : buscarProducto.item}</div>                      
                <button onclick="aumentarCantidad(${id})"  class="btn value-button">+</i>
          </div>
          <div class="col-2">
            <p id="cartItem1Price">$${sumaProducto}</p>
          </div>
          <hr class="division">
    
                `
            
        }).join(" "));
        
    }

    else {

        articuloCarrito.innerHTML= `


        `

    estadoCarrito.innerHTML = `
        <h2>Tu carrito está vacio</h2>
        <a href="catalogo.html">
            <button class="btn btn-lg btn-primary d-flex justify-content-center mt-3">Volver al Catálogo</button>
        </a>

        `
    }
})}
  

generarCarrito()

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
        
    calcularTotal ()

    generarCarrito()


    Toastify({

        text: "Agregaste un Producto!",
        
        duration: 3000
        
        }).showToast();

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

    calcularTotal ()

    generarCarrito()

    Toastify({

        text: "Eliminaste un Producto!",
        
        duration: 3000
        
        }).showToast();


}


let eliminarProducto = (id) =>{

    let productoSeleccionado = id

    carrito = carrito.filter((x)=>x.id !== productoSeleccionado)

    localStorage.setItem("info", JSON.stringify(carrito))

    calculo()

    generarCarrito()

   
}
//plasma el precio total de la compra
let calcularTotal= ()=>{
    if  (carrito.length !== 0){
    fetch("../productos.json")
        .then (function(resp){
            return resp.json()
        })
        .then(function(productos){
            let total = carrito.map((x)=>{
                let{item,id}= x
                    
                let buscar = productos.find((x)=>x.id === id) || []
                
                return item*buscar.precio
              
                }).reduce((x,y)=>x+y, 0)
              
                estadoCarrito.innerHTML = `
                <button type="button" class="btn btn-danger mb-2 mx-auto d-flex justify-content-center"  onclick="borrarCarrito()" style="width: 200px;">Eliminar todos los Productos</button><br><button type="button" class="btn btn-success mb-2 mx-auto d-flex justify-content-center" onclick="confirmarPago()" style="width: 200px">Ir al Pago</button><br><h2 class="mb-2 mx-auto" "><strong>El total de tu compra es: $ ${total}</strong></h2>
              
                `
        })}
    else return
}

//elmina la totalidad del carrito
let borrarCarrito = ()=>{
    swal({
        title: "Estás seguro?",
        text: "Una vez elimines los productos tendras que volver a seleccionar tus productos",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        
    
        if (willDelete) {

        carrito = []

        calculo()
    
        generarCarrito()
    
        localStorage.setItem("info", JSON.stringify(carrito))
        
          swal("Eliminaste los productos", {
            icon: "success",
          });
        } else {
          swal("Continua comprando");
        }
      });


    


}

//confirma al cliente que esta listo para pasar a la pasarela de pago
let confirmarPago = ()=>{

    swal("Todo listo!", "Vamos a avanzar con el proceso de pago", "success")
}

calcularTotal ()