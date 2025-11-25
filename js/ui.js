import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";

export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) contador.textContent = carrito.length;
};

// Mensaje como toast, pero sin estilos en línea
export const mostrarMensaje = (msg) => {
  const toast = document.createElement("div");
  toast.classList.add("toast"); // 👈 solo clase CSS
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
};

export const mostrarCarrito = (carrito) => {
  const contenedorCarrito = document.getElementById("carrito");
  if (!contenedorCarrito) return;

  contenedorCarrito.innerHTML = "";

  if (!carrito || carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach((producto, indice) => {
    const item = document.createElement("div");
    item.classList.add("item-carrito");

    const nombre = document.createElement("p");
    nombre.textContent = `${producto.nombre} - $${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);
    });

    item.appendChild(nombre);
    item.appendChild(btnEliminar);
    contenedorCarrito.appendChild(item);
  });

  const total = carrito.reduce((acc, p) => acc + Number(p.precio || 0), 0);
  const totalDiv = document.createElement("p");
  totalDiv.classList.add("total-carrito");
  totalDiv.textContent = `Total: $${total}`;
  contenedorCarrito.appendChild(totalDiv);

  let btnVaciar = document.getElementById("vaciar-carrito");
  if (!btnVaciar) {
    btnVaciar = document.createElement("button");
    btnVaciar.id = "vaciar-carrito";
    btnVaciar.textContent = "Vaciar carrito";
    contenedorCarrito.appendChild(btnVaciar);
  }
  btnVaciar.onclick = () => vaciarCarrito();
};

// Inicializa al cargar
document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  mostrarCarrito(carrito);
});
