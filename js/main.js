//tomando id para inyectar html
let catalogo = document.getElementById('catalogoArticulos')

//tomando info previa de local storage
let carrito = JSON.parse(localStorage.getItem("info")) || []



let crearCatalogo = () => {
    //creando tarjetas para cada producto
    fetch("../productos.json")
    .then (function(resp){
        return resp.json()
    })
    .then(function(productos){
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
        
    })
    
    
}
   
crearCatalogo()

let aumentarCantidad = (id)=>{
    //se identifica producto clickeado
    let productoSeleccionado = id

    let buscarProducto = carrito.find((p)=>p.id === productoSeleccionado);
        //en caso de que el producto no este en el carrito, se agrega
        if (buscarProducto === undefined){
        carrito.push ({
            id: productoSeleccionado,
            item: 1,
        });
        //en caso de que ya este agregado, se aumenta la cantidad
        }else {buscarProducto.item +=1;}


    //se calcula nuevamente la cantidad de items en total en el carrito, se guarda y se renderiza nuevamente    
    calculo()
    localStorage.setItem("info", JSON.stringify(carrito))
    crearCatalogo()

    Toastify({

        text: "Agregaste un Producto!",
        
        duration: 3000
        
        }).showToast();

}

let reducirCantidad = (id) =>{
    //se identifica producto clickeado
    let productoSeleccionado = id

    let buscarProducto = carrito.find((p)=>p.id === productoSeleccionado);
    //evita que la cantidad de producto sea menor a 0
    if(buscarProducto === undefined) return;
    else if (buscarProducto.item === 0) return;
    else {buscarProducto.item -=1;}

    calculo()
    // se encuentra el producto cuyo valor llego a 0 y se elimina del carrito
    carrito = carrito.filter((p)=>p.item !== 0)

    localStorage.setItem("info", JSON.stringify(carrito))

    crearCatalogo()

    Toastify({

        text: "Eliminaste un Producto!",
        
        duration: 3000
        
        }).showToast();

}
//actualiza el nuemro de items en el carro
let calculo = ()=>{
    let cantidadCarrito = document.getElementById("cantidadCarrito");

    cantidadCarrito.innerHTML = carrito.map((x)=>x.item).reduce((x,y)=>x+y, 0)
     
}

calculo()