
function actualizarFechaHora() {
  const contenedor = document.getElementById('fecha-hora');
  if (!contenedor) return;

  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  const ahora = new Date();
  const fechaFormateada = ahora.toLocaleDateString('es-CL', opcionesFecha);
  const horaFormateada = ahora.toLocaleTimeString('es-CL', opcionesHora);

  contenedor.innerHTML = `<small>${fechaFormateada} | ${horaFormateada}</small>`;
}

setInterval(actualizarFechaHora, 1000);

// Carrito de compras
const carrito = [
  { id: 1, nombre: 'Arepa Reina Pepiada', precio: 3500, cantidad: 2, imagen: '../assets/img/arepa.png' },
  { id: 2, nombre: 'Tequeños x6', precio: 4000, cantidad: 1, imagen: '../assets/img/tequeños.jpg' },
  { id: 3, nombre: 'Empanada de Queso', precio: 2500, cantidad: 3, imagen: '../assets/img/empanada.jpg' }
];

function renderCarrito() {
  let total = 0;
  $('#carrito-body').empty();
  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    $('#carrito-body').append(`
      <tr>
        <td><img src="${producto.imagen}" width="60" alt="${producto.nombre}" class="rounded"/></td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td><input type="number" class="form-control" min="1" value="${producto.cantidad}" onchange="actualizarCantidad(${producto.id}, this.value)"></td>
        <td>$${subtotal}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
      </tr>
    `);
  });
  $('#carrito-total').text(total);
}

function actualizarCantidad(id, nuevaCantidad) {
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    producto.cantidad = parseInt(nuevaCantidad);
    renderCarrito();
  }
}

function eliminarProducto(id) {
  const index = carrito.findIndex(p => p.id === id);
  if (index !== -1) {
    carrito.splice(index, 1);
    renderCarrito();
  }
}

function finalizarCompra() {
  alert('Gracias por tu compra. Recibirás un correo con los detalles.');
}

document.addEventListener('DOMContentLoaded', function () {
  actualizarFechaHora();

  const formulario = document.getElementById('form-contacto');
  if (formulario) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = formulario.querySelector('input[type="text"]').value.trim();
      const email = formulario.querySelector('input[type="email"]').value.trim();
      const mensaje = formulario.querySelector("textarea").value.trim();

      if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      alert("Gracias por contactarnos, " + nombre + ". Te responderemos pronto.");
      formulario.reset();
    });
  }

  document.querySelectorAll('.quantity-controls').forEach(group => {
    const product = group.getAttribute('data-product');
    const display = document.getElementById(`qty-${product}`);
    let count = 0;

    group.querySelector('.btn-plus').addEventListener('click', () => {
      count++;
      display.textContent = count;
    });

    group.querySelector('.btn-minus').addEventListener('click', () => {
      if (count > 0) count--;
      display.textContent = count;
    });
  });

  if ($('#carrito-body').length) {
    renderCarrito();
  }

  if ($('#tabla-pedidos').length) {
    $('#tabla-pedidos').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
      }
    });
  }
});
