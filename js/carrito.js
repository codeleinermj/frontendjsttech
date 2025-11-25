import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const acciones = document.getElementById("acciones-carrito");
  const resumen = document.getElementById("resumen-carrito");

  contenedor.innerHTML = "";
  acciones.innerHTML = "";
  resumen.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.textContent = "No hay productos en el carrito.";
    return;
  }

  carrito.forEach((producto, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-producto");

    const img = document.createElement("img");
    img.src = "../" + producto.img;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = "$" + producto.precio;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
      eliminarProducto(indice);
      renderizarCarrito();
    };

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  // Calcular total
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  resumen.innerHTML = `<h2>Total: $${total.toLocaleString()}</h2>`;

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.onclick = () => {
    vaciarCarrito();
    renderizarCarrito();
  };

  const btnPago = document.createElement("button");
  btnPago.classList.add("btn");
  btnPago.textContent = "Realizar pago";
  btnPago.style.backgroundColor = "#2d8659";
  btnPago.style.marginLeft = "1rem";
  btnPago.onclick = () => {
    alert(`Procesando pago de $${total.toLocaleString()}. ¡Gracias por tu compra!`);
    vaciarCarrito();
    renderizarCarrito();
  };

  acciones.appendChild(btnVaciar);
  acciones.appendChild(btnPago);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);