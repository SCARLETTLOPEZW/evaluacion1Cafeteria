const productos = [
  {
    codigo: "CMP001",
    categoria: "Café Molido Premium",
    region: "Colombia",
    proceso: "Lavado",
    tostado: "Medio",
    sabor: ["Chocolate", "Caramelo"],
    nombre: "Colombia Huila Supremo (250g)",
    precio: 8500,
    descripcion: "Café de altura con notas a chocolate y caramelo. Cuerpo medio-alto, acidez balanceada. Ideal para métodos de filtrado.",
    productor: "Finca El Paraíso",
    altitud: "1800 msnm",
    notas: "Chocolate, caramelo, frutos secos",
    sostenible: true
  },
  {
    codigo: "CMP002",
    categoria: "Café Molido Premium",
    region: "Etiopía",
    proceso: "Lavado",
    tostado: "Claro",
    sabor: ["Frutal", "Cítrico"],
    nombre: "Etiopía Yirgacheffe (250g)",
    precio: 12000,
    descripcion: "Café floral y afrutado con notas cítricas. Acidez brillante y cuerpo ligero. Perfecto para pour over y V60.",
    productor: "Cooperativa Yirgacheffe",
    altitud: "2000 msnm",
    notas: "Flores, cítricos, frutas",
    sostenible: true
  },
  {
    codigo: "CG001",
    categoria: "Café en Grano",
    region: "Brasil",
    proceso: "Naturales",
    tostado: "Medio",
    sabor: ["Chocolate", "Nuez"],
    nombre: "Brasil Santos (500g)",
    precio: 9500,
    descripcion: "Café clásico con notas a nuez y chocolate. Cuerpo medio, baja acidez. Excelente para espresso y métodos de inmersión.",
    productor: "Fazenda Primavera",
    altitud: "900 msnm",
    notas: "Nuez, chocolate, suave",
    sostenible: false
  },
  {
    codigo: "CG002",
    categoria: "Café en Grano",
    region: "Guatemala",
    proceso: "Lavado",
    tostado: "Oscuro",
    sabor: ["Especiado", "Ahumado"],
    nombre: "Guatemala Antigua (500g)",
    precio: 11500,
    descripcion: "Café volcánico con notas especiadas y ahumadas. Cuerpo completo y acidez media. Ideal para prensa francesa.",
    productor: "Finca La Esperanza",
    altitud: "1600 msnm",
    notas: "Especias, ahumado, cacao",
    sostenible: true
  },
  {
    codigo: "CV001",
    categoria: "Café Verde",
    region: "Perú",
    proceso: "Honey",
    tostado: "Claro",
    sabor: ["Frutal", "Dulce"],
    nombre: "Perú Chanchamayo (1kg)",
    precio: 15000,
    descripcion: "Café verde de comercio justo con perfil equilibrado. Ideal para tostadores caseros que buscan versatilidad.",
    productor: "Cooperativa Chanchamayo",
    altitud: "1400 msnm",
    notas: "Frutas, dulce, herbal",
    sostenible: true
  },
  {
    codigo: "CV002",
    categoria: "Café Verde",
    region: "Costa Rica",
    proceso: "Honey",
    tostado: "Claro",
    sabor: ["Frutal", "Cítrico"],
    nombre: "Costa Rica Tarrazú (1kg)",
    precio: 18000,
    descripcion: "Café verde de comercio justo con perfil equilibrado. Ideal para tostadores caseros que buscan versatilidad.",
    productor: "Finca Tarrazú",
    altitud: "1700 msnm",
    notas: "Frutas, cítricos, floral",
    sostenible: true
  },
  {
    codigo: "BE001",
    categoria: "Blends Especiales",
    region: "Blend",
    proceso: "Lavado",
    tostado: "Medio",
    sabor: ["Dulce", "Chocolate"],
    nombre: "Blend Casa Aroma (250g)",
    precio: 7500,
    descripcion: "Mezcla exclusiva de granos sudamericanos. Equilibrio perfecto entre dulzor y acidez para todo el día.",
    productor: "Blend Sudamérica",
    altitud: "-",
    notas: "Dulce, chocolate, balanceado",
    sostenible: false
  },
  {
    codigo: "BE002",
    categoria: "Blends Especiales",
    region: "Blend",
    proceso: "Lavado",
    tostado: "Oscuro",
    sabor: ["Chocolate", "Intenso"],
    nombre: "Blend Espresso Italiano (250g)",
    precio: 8000,
    descripcion: "Mezcla exclusiva de granos sudamericanos. Equilibrio perfecto entre dulzor y acidez para todo el día.",
    productor: "Blend Italia",
    altitud: "-",
    notas: "Chocolate, intenso, cuerpo alto",
    sostenible: false
  }
];

let carrito = [];
let preferencias = { sabor: null, metodo: null };
let comentarios = [];

function formatoCLP(valor) {
  return "$" + valor.toLocaleString("es-CL") + " CLP";
}

function renderProductos(filtrados = null) {
  const lista = filtrados || productos;
  const tabla = document.createElement('table');
  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Código</th>
        <th>Categoría</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${lista.map((p, i) => `
        <tr>
          <td>${p.codigo}</td>
          <td>${p.categoria}</td>
          <td>
            <a href="#" class="verTrazabilidad" data-idx="${productos.indexOf(p)}">${p.nombre}</a>
          </td>
          <td>${formatoCLP(p.precio)}</td>
          <td><button class="btn btn-add" data-idx="${productos.indexOf(p)}">Agregar</button></td>
        </tr>
      `).join('')}
    </tbody>
  `;
  const contenedor = document.getElementById('tabla-productos');
  contenedor.innerHTML = "";
  contenedor.appendChild(tabla);
}
renderProductos();

function renderDescripciones() {
  const ul = document.getElementById('lista-descripciones');
  ul.innerHTML = "";
  productos.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${p.nombre.split('(')[0].trim()}:</b> ${p.descripcion}`;
    ul.appendChild(li);
  });
}
renderDescripciones();

function renderCarrito() {
  const cartContent = document.getElementById('cart-content');
  if (!cartContent) return;
  if (carrito.length === 0) {
    cartContent.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }
  let total = 0;
  cartContent.innerHTML = `
    <table style="width:100%">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${carrito.map((item, idx) => {
    const prod = productos[item.idx];
    let precio = prod.precio;
    const desc = obtenerDescuentoProducto(prod);
    if (desc) precio = Math.round(precio * (1 - desc / 100));
    const subtotal = precio * item.cantidad;
    total += subtotal;
    return `
            <tr>
              <td>${prod.nombre}${desc ? ` <span style="color:#DAA520;">(-${desc}%)</span>` : ""}</td>
              <td>${item.cantidad}</td>
              <td>${formatoCLP(subtotal)}</td>
              <td><button class="btn btn-remove" data-cart-idx="${idx}">Quitar</button></td>
            </tr>
          `;
  }).join('')}
      </tbody>
    </table>
    <p style="text-align:right;margin-top:12px;"><strong>Total: ${formatoCLP(total)}</strong></p>
    <button class="btn" id="finalizarCompra">Finalizar compra</button>
  `;
  document.getElementById('floatCount').textContent = carrito.reduce((a, b) => a + b.cantidad, 0);
  document.getElementById('cartCount').textContent = carrito.reduce((a, b) => a + b.cantidad, 0);
  document.getElementById('floatTotal').textContent = total.toLocaleString("es-CL");
}
renderCarrito();

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-add')) {
    const idx = parseInt(e.target.getAttribute('data-idx'));
    const found = carrito.find(item => item.idx === idx);
    if (found) {
      found.cantidad += 1;
    } else {
      carrito.push({ idx, cantidad: 1 });
    }
    renderCarrito();
  }
  if (e.target.classList.contains('btn-remove')) {
    const idx = parseInt(e.target.getAttribute('data-cart-idx'));
    carrito.splice(idx, 1);
    renderCarrito();
  }
  if (e.target.id === "finalizarCompra") {
    alert("¡Gracias por tu compra! (demo)");
    carrito = [];
    renderCarrito();
    document.getElementById('cartModal').style.display = 'none';
  }
  if (e.target.id === "viewCart") {
    renderCarrito();
    document.getElementById('cartModal').style.display = 'flex';
  }
  if (e.target.classList.contains('close-modal')) {
    const modalId = e.target.getAttribute('data-close');
    document.getElementById(modalId).style.display = 'none';
  }
  if (e.target.classList.contains('verTrazabilidad')) {
    e.preventDefault();
    const idx = parseInt(e.target.getAttribute('data-idx'));
    mostrarTrazabilidad(idx);
  }
});

function filtrarProductos() {
  const region = document.getElementById('filterRegion').value;
  const proceso = document.getElementById('filterProcess').value;
  const tostado = document.getElementById('filterRoast').value;
  let lista = productos.filter(p =>
    (region === "all" || p.region === region) &&
    (proceso === "all" || p.proceso === proceso) &&
    (tostado === "all" || p.tostado === tostado)
  );
  renderProductos(lista);
}
document.getElementById('filterRegion').onchange = filtrarProductos;
document.getElementById('filterProcess').onchange = filtrarProductos;
document.getElementById('filterRoast').onchange = filtrarProductos;

document.getElementById('search').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  const lista = productos.filter(p =>
    p.nombre.toLowerCase().includes(q) ||
    p.categoria.toLowerCase().includes(q) ||
    p.region.toLowerCase().includes(q)
  );
  renderProductos(lista);
});

document.querySelectorAll('.tag').forEach(tag => {
  tag.onclick = function () {
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('selected'));
    this.classList.add('selected');
    preferencias.sabor = this.dataset.flavor;
  };
});
document.getElementById('prefMethod').onchange = function () {
  preferencias.metodo = this.value;
};

document.getElementById('calcular').onclick = function () {
  const cafe = parseFloat(document.getElementById('calcCafe').value);
  const relacion = parseFloat(document.getElementById('calcRelacion').value);
  if (isNaN(cafe) || isNaN(relacion) || cafe <= 0 || relacion <= 0) {
    document.getElementById('resultadoCalc').textContent = "Valores inválidos.";
    return;
  }
  const agua = cafe * relacion;
  document.getElementById('resultadoCalc').textContent = `Usa ${agua} ml de agua para ${cafe}g de café.`;
};

document.getElementById('formComunidad').onsubmit = function (e) {
  e.preventDefault();
  const texto = document.getElementById('comentario').value.trim();
  if (texto.length < 3) return;
  comentarios.push(texto);
  document.getElementById('comentario').value = "";
  renderComentarios();
};
function renderComentarios() {
  const div = document.getElementById('comentarios');
  div.innerHTML = comentarios.map(c => `<div class="comentario">${c}</div>`).join('');
}
renderComentarios();

function mostrarTrazabilidad(idx) {
  const p = productos[idx];
  document.getElementById('detalleTrazabilidad').innerHTML = `
    <h4>${p.nombre}</h4>
    <ul>
      <li><b>Origen:</b> ${p.region}</li>
      <li><b>Productor:</b> ${p.productor}</li>
      <li><b>Altitud:</b> ${p.altitud}</li>
      <li><b>Proceso:</b> ${p.proceso}</li>
      <li><b>Nivel de tostado:</b> ${p.tostado}</li>
      <li><b>Notas de cata:</b> ${p.notas}</li>
      <li><b>Sostenible:</b> ${p.sostenible ? "Sí" : "No"}</li>
    </ul>
    <p>${p.descripcion}</p>
  `;
  document.getElementById('trazabilidad').scrollIntoView({ behavior: "smooth" });
}

function updateFloatingCart() {
  let count = carrito.reduce((a, b) => a + b.cantidad, 0);
  let total = carrito.reduce((a, b) => a + productos[b.idx].precio * b.cantidad, 0);
  document.getElementById('floatCount').textContent = count;
  document.getElementById('floatTotal').textContent = total.toLocaleString("es-CL");
}
setInterval(updateFloatingCart, 500);

document.getElementById('openBooking').onclick = function () {
  document.getElementById('bookingModal').style.display = 'flex';
};

document.addEventListener('DOMContentLoaded', function () {
  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById('fechaReserva').setAttribute('min', hoy);
});

document.getElementById('openBooking').onclick = function () {
  document.getElementById('bookingModal').style.display = 'flex';
};

const reservas = {};

document.addEventListener('DOMContentLoaded', function () {
  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById('fechaReserva').setAttribute('min', hoy);
});

document.getElementById('formReserva').onsubmit = function (e) {
  e.preventDefault();
  const fecha = document.getElementById('fechaReserva').value;
  const hora = document.getElementById('horaReserva').value;
  const clave = fecha + "_" + hora;
  const mensajeDiv = document.getElementById('mensajeReserva');

  if (!fecha || !hora) {
    mensajeDiv.innerHTML = '<span style="color:red;">Debes seleccionar fecha y hora.</span>';
    return;
  }

  if (reservas[clave]) {
    mensajeDiv.innerHTML = '<span style="color:red;">¡Esa hora ya está reservada! Elige otra.</span>';
  } else {
    reservas[clave] = true;
    mensajeDiv.innerHTML = `<span style="color:green;">¡Reserva realizada para el ${fecha} a las ${hora}!</span>`;
    this.reset();
  }
};

let usuarioActual = null;

document.getElementById('tabLogin').onclick = function () {
  document.getElementById('formLogin').style.display = '';
  document.getElementById('formRegistro').style.display = 'none';
};
document.getElementById('tabRegistro').onclick = function () {
  document.getElementById('formLogin').style.display = 'none';
  document.getElementById('formRegistro').style.display = '';
};

document.getElementById('openLogin').onclick = function () {
  document.getElementById('loginModal').style.display = 'flex';
};

document.getElementById('openProfile').onclick = function () {
  if (usuarioActual) {
    if (confirm("¿Cerrar sesión?")) {
      usuarioActual = null;
      localStorage.removeItem('usuarioActual');
      actualizarBarraUsuario();
      alert("Sesión cerrada.");
    }
  } else {
    alert("No has iniciado sesión.");
  }
};

document.getElementById('formRegistro').onsubmit = function (e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass = document.getElementById('regPass').value;
  const codigo = document.getElementById('regCodigo').value.trim().toUpperCase();
  const barista = document.getElementById('regBarista').checked;
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (usuarios.find(u => u.email === email)) {
    document.getElementById('mensajeRegistro').innerHTML = '<span style="color:red;">Ya existe un usuario con ese email.</span>';
    return;
  }
  const user = {
    email,
    pass,
    descuento: codigo === "AROMA20" ? 15 : 0,
    barista: barista,
    premium: false
  };
  usuarios.push(user);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  usuarioActual = user;
  localStorage.setItem('usuarioActual', JSON.stringify(user));
  document.getElementById('mensajeRegistro').innerHTML = `<span style="color:green;">¡Registro exitoso!${user.descuento ? " Tienes 15% de descuento de por vida." : ""}${barista ? " Eres barista profesional." : ""}</span>`;
  actualizarBarraUsuario();
  setTimeout(() => document.getElementById('loginModal').style.display = 'none', 1200);
};

document.getElementById('formLogin').onsubmit = function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const user = usuarios.find(u => u.email === email && u.pass === pass);
  if (!user) {
    document.getElementById('mensajeLogin').innerHTML = '<span style="color:red;">Usuario o contraseña incorrectos.</span>';
    return;
  }
  usuarioActual = user;
  localStorage.setItem('usuarioActual', JSON.stringify(user));
  document.getElementById('mensajeLogin').innerHTML = `<span style="color:green;">¡Bienvenido!</span>`;
  actualizarBarraUsuario();
  setTimeout(() => document.getElementById('loginModal').style.display = 'none', 1200);
};

function actualizarBarraUsuario() {
  const nav = document.querySelector('nav');
  if (usuarioActual) {
    document.getElementById('openLogin').style.display = 'none';
    document.getElementById('openProfile').style.display = '';
    document.getElementById('openProfile').textContent = usuarioActual.email + " (Salir)";
  } else {
    document.getElementById('openLogin').style.display = '';
    document.getElementById('openProfile').style.display = '';
    document.getElementById('openProfile').textContent = "Mi Panel";
  }
}
window.onload = function () {
  usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
  actualizarBarraUsuario();
};

function obtenerDescuentoProducto(prod) {
  if (!usuarioActual) return 0;
  if (usuarioActual.barista && (prod.categoria === "Café Verde" || prod.categoria === "Equipamiento Barista")) return 20;
  if (usuarioActual.descuento) return usuarioActual.descuento;
  return 0;
}

document.addEventListener('DOMContentLoaded', () => {

  function showModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.display = 'flex';
    m.setAttribute('aria-hidden', 'false');
  }
  function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.display = 'none';
    m.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.close;
      if (target) closeModal(target);
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    }
  });

  const howBtn = document.getElementById('howBarista');
  if (howBtn) {
    howBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const contenido = `
        <h3>¿Cómo verificar como Barista?</h3>
        <ol>
          <li>Inicia sesión o regístrate en tu cuenta.</li>
          <li>Completa tu perfil: nombre, ciudad y experiencia.</li>
          <li>Sube tu certificación o enlace a tu portafolio / redes.</li>
          <li>Adjunta una foto trabajando o un video corto (opcional).</li>
        </ol>
        <p>El equipo revisará tu solicitud en 48–72 horas y te notificaremos por correo.</p>
        <p style="margin-top:12px">
          <button class="btn" id="startVerification">Comenzar verificación</button>
          <button class="btn secondary" id="closeHow">Cerrar</button>
        </p>
      `;

      const mc = document.getElementById('modal-content');
      if (mc) mc.innerHTML = contenido;

      showModal('modal');

      setTimeout(() => {
        const startBtn = document.getElementById('startVerification');
        const closeHow = document.getElementById('closeHow');

        if (startBtn) {
          startBtn.addEventListener('click', () => {
            closeModal('modal');
            showModal('perfilModal');
          });
        }

        if (closeHow) {
          closeHow.addEventListener('click', () => closeModal('modal'));
        }
      }, 50);
    });
  }

});