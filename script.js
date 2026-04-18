// =======================
// CARRUSEL (SEGURO)
// =======================
const carousel = document.getElementById("carouselProductos");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let scrollAmount = 0;

// 🔥 Solo ejecutar si existen elementos (evita romper el JS)
if (carousel && nextBtn && prevBtn) {

    function getItemWidth() {
        const item = carousel.querySelector(".carousel-item-custom");
        return item ? item.offsetWidth : 0;
    }

    nextBtn.addEventListener("click", () => {
        scrollAmount += getItemWidth();
        carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
        updateButtons();
    });

    prevBtn.addEventListener("click", () => {
        scrollAmount -= getItemWidth();
        carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
        updateButtons();
    });

    function updateButtons() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        prevBtn.style.display = scrollAmount <= 0 ? "none" : "block";
        nextBtn.style.display = scrollAmount >= maxScroll - 5 ? "none" : "block";
    }

    // Inicial
    updateButtons();

    // Ajustar al redimensionar
    window.addEventListener("resize", () => {
        scrollAmount = carousel.scrollLeft;
        updateButtons();
    });
}


// =======================
// FORMULARIOS (VALIDACIÓN CORRECTA)
// =======================
document.addEventListener("DOMContentLoaded", function () {

    const forms = document.querySelectorAll("#form-cotizacion");

    if (!forms.length) return;

    forms.forEach(form => {

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = form.querySelector("#nombre")?.value.trim();
            const correo = form.querySelector("#correo")?.value.trim();
            const servicio = form.querySelector("#servicio")?.value;
            const mensaje = form.querySelector("#mensaje")?.value.trim();

            // =======================
            // VALIDACIONES
            // =======================

            if (!nombre) {
                alert("Por favor ingresa tu nombre");
                return;
            }

            if (!servicio) {
                alert("Por favor selecciona un servicio");
                return;
            }

            if (!mensaje) {
                alert("Por favor escribe tu mensaje");
                return;
            }

            // =======================
            // MENSAJE WHATSAPP
            // =======================

            let texto = `Hola, quiero cotizar un servicio:\n`;
            texto += `Nombre: ${nombre}\n`;
            texto += `Correo: ${correo || "No proporcionado."}\n`;
            texto += `Servicio: ${servicio}\n`;
            texto += `Mensaje: ${mensaje}.`;

            const telefono = "522221106016";

            const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank");
        });

    });

});

// BOLETOS
let cart = [];

window.onload = () => generateTickets();

let soldTickets = []; // ← aquí pones los vendidos

function generateTickets() {
    const grid = document.getElementById("grid");

    for (let i = 1; i <= 200; i++) {
        const div = document.createElement("div");
        div.className = "ticket";
        div.innerText = i;

        // 🔴 Si está vendido
        if (soldTickets.includes(i)) {
            div.classList.add("sold");
        } else {
            div.onclick = () => toggleTicket(i, div);
        }

        grid.appendChild(div);
    }
}

function toggleTicket(num, el) {
    if (!cart.includes(num)) {
        cart.push(num);
        el.classList.add("selected");
    } else {
        cart = cart.filter(n => n !== num);
        el.classList.remove("selected");
    }

    updateCartUI();
}

function updateCartUI() {
    renderCart();
    document.getElementById("cart-count").innerText = cart.length;
}

function renderCart() {
    const list = document.getElementById("cart-list");
    list.innerHTML = "";

    cart.forEach(n => {
        const li = document.createElement("li");
        li.innerHTML = `${n} <button onclick="removeItem(${n})">x</button>`;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = cart.length * 200;
}

function removeItem(num) {
    cart = cart.filter(n => n !== num);
    document.querySelectorAll(".ticket").forEach(el => {
        if (parseInt(el.innerText) === num) {
            el.classList.remove("selected");
        }
    });

    updateCartUI();
}

function clearCart() {
    cart = [];
    document.querySelectorAll(".ticket").forEach(el => el.classList.remove("selected"));
    updateCartUI();
}

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function sendWhatsApp() {
    if (cart.length === 0) return;

    const msg = `Quiero estos boletos:\n${cart.join(", ")}\nTotal: $${cart.length * 200}`;

    window.open(`https://wa.me/5212221106016?text=${encodeURIComponent(msg)}`);
}
