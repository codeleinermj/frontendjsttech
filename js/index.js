import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarCarrito } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-tarjetas"); // id en tu HTML

  // Inicialización UI
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  mostrarCarrito(carrito);

  fetch("./data/productos.json") // ajustá la ruta según tu estructura
    .then((res) => res.json())
    .then((productos) => {
      productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const img = document.createElement("img");
        img.src = producto.img;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = "$" + producto.precio;

        const boton = document.createElement("button");
        boton.classList.add("btn");
        boton.textContent = "Agregar al carrito";
        boton.addEventListener("click", () => agregarAlCarrito(producto));

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);
        contenedor.appendChild(tarjeta);
      });
    })
    .catch((err) => console.error("Error cargando productos:", err));
});
