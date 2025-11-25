import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";
import { actualizarContador, mostrarCarrito, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  carrito.push(producto);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarCarrito(carrito); // refresca la vista
  mostrarMensaje("Producto agregado al carrito");
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  // Evitar índices inválidos
  if (indice < 0 || indice >= carrito.length) return;

  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarCarrito(carrito); // refresca la vista
  mostrarMensaje("Producto eliminado");
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarCarrito([]); // limpia la vista
  mostrarMensaje("Carrito vaciado");
};
