export const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem("carrito")) || [];
};

export const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

export const vaciarCarritoStorage = () => {
  localStorage.removeItem("carrito");
};
