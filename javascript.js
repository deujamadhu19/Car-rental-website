const carsData = [
  {
    id: 1,
    name: "BMW M3",
    type: "Full Electric · Long Range",
    price: 89,
    image: "assests/bmw m3.jpg",
    isNew: true,
    available: true,
  },
  {
    id: 2,
    name: "Audi A4",
    type: "Luxury Sedan · Quattro",
    price: 115,
    image: "assests/audi a4.jpg",
    isNew: false,
    available: false,
  },
  {
    id: 3,
    name: "Doge challenger",
    type: "Sport · Hybrid",
    price: 95,
    image: "assests/dodge.jpg",
    isNew: false,
    available: true,
  },
];

//Build & inject the section 
document.addEventListener("DOMContentLoaded", () => {
  injectCarStyles();
  buildCarSection();
});

function buildCarSection() {
  const section = document.querySelector("section.car#car");
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="car-section-header">
        <div class="car-section-left">
          <p class="car-section-label">OUR FLEET</p>
          <h2 class="car-section-title">Curated for Excellence</h2>
        </div>
        <a href="#" class="car-view-all">View all vehicles <span>→</span></a>
      </div>

      <div class="cars-filter-bar">
        <button class="cars-filter-btn active" data-filter="all">All</button>
        <button class="cars-filter-btn" data-filter="available">Available</button>
        <button class="cars-filter-btn" data-filter="unavailable">Unavailable</button>
      </div>

      <div class="cars-grid" id="cars-grid"></div>
    </div>
  `;

  renderCards("all");
  attachCarFilters();
}

//Render cards 
function renderCards(filter) {
  const grid = document.getElementById("cars-grid");
  if (!grid) return;

  const filtered =
    filter === "all"
      ? carsData
      : filter === "available"
      ? carsData.filter((c) => c.available)
      : carsData.filter((c) => !c.available);

  grid.innerHTML = "";

  filtered.forEach((car, i) => {
    const card = document.createElement("div");
    card.className = "car-card-item";
    card.style.animationDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <div class="car-card-img-wrap">
        <img
          src="${car.image}"
          alt="${car.name}"
          class="car-card-img"
          onerror="this.parentElement.style.background='#f0f0ee'"
        />
        ${car.isNew ? `<span class="car-badge-new">New</span>` : ""}
        <span class="car-avail-dot ${car.available ? "dot-available" : "dot-unavailable"}"></span>
      </div>

      <div class="car-card-info">
        <div class="car-card-top-row">
          <div>
            <h3 class="car-card-name">${car.name}</h3>
            <p class="car-card-type">${car.type}</p>
          </div>
          <span class="car-avail-label ${car.available ? "avail-yes" : "avail-no"}">
            ${car.available ? "● Available" : "● Unavailable"}
          </span>
        </div>

        <div class="car-card-bottom-row">
          <p class="car-card-price">$${car.price}<span>/day</span></p>
          <button
            class="car-rent-btn ${!car.available ? "car-rent-btn-disabled" : ""}"
            onclick="handleRentClick(${car.id})"
            ${!car.available ? "disabled" : ""}
          >
            ${car.available ? "Rent Now" : "Unavailable"}
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="cars-empty">No cars match this filter.</p>`;
  }
}

//Filter buttons 
function attachCarFilters() {
  document.querySelectorAll(".cars-filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".cars-filter-btn").forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      renderCards(this.dataset.filter);
    });
  });
}

//Rent button click 
function handleRentClick(carId) {
  const car = carsData.find((c) => c.id === carId);
  if (!car || !car.available) return;

  // Visual feedback on button
  const btns = document.querySelectorAll(".car-rent-btn");
  btns.forEach((btn) => {
    if (btn.closest(".car-card-item")?.querySelector(".car-card-name")?.textContent === car.name) {
      btn.textContent = "Booked ✓";
      btn.style.background = "#16a34a";
      setTimeout(() => {
        btn.textContent = "Rent Now";
        btn.style.background = "";
      }, 2500);
    }
  });

  // Mark as rented
  car.available = false;
  setTimeout(() => {
    renderCards(document.querySelector(".cars-filter-btn.active")?.dataset.filter || "all");
  }, 2600);
}

//All styles 
function injectCarStyles() {
  const style = document.createElement("style");
  style.textContent = `

    /* Section wrapper */
    section.car {
      padding: 80px 0 60px;
      background: #f5f4f0;
    }

    /* Header row */
    .car-section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .car-section-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #999;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .car-section-title {
      font-size: 2rem;
      font-weight: 800;
      color: #1a1a1a;
      letter-spacing: -0.02em;
    }
    .car-view-all {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      transition: gap 0.2s;
    }
    .car-view-all:hover { gap: 10px; }

    /* Filter bar */
    .cars-filter-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 32px;
    }
    .cars-filter-btn {
      padding: 7px 20px;
      border-radius: 30px;
      border: 1.5px solid #ddd;
      background: #fff;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      color: #666;
      transition: all 0.2s;
    }
    .cars-filter-btn.active,
    .cars-filter-btn:hover {
      background: #1a272d;
      color: #fff;
      border-color: #1a272d;
    }

    /* Grid */
    .cars-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    @media (max-width: 900px) {
      .cars-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 580px) {
      .cars-grid { grid-template-columns: 1fr; }
    }

    /* Card */
    .car-card-item {
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      transition: transform 0.22s ease, box-shadow 0.22s ease;
      animation: cardFadeUp 0.45s ease both;
    }
    @keyframes cardFadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .car-card-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.11);
    }

    /* Image wrap */
    .car-card-img-wrap {
      position: relative;
      background: #f0efeb;
      height: 200px;
      overflow: hidden;
    }
    .car-card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.35s ease;
    }
    .car-card-item:hover .car-card-img {
      transform: scale(1.04);
    }

    /* "New" badge */
    .car-badge-new {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #e8f5e9;
      color: #2e7d32;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      letter-spacing: 0.04em;
    }

    /* Availability dot (top-left) */
    .car-avail-dot {
      position: absolute;
      top: 12px;
      left: 12px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    .dot-available   { background: #16a34a; }
    .dot-unavailable { background: #dc2626; }

    /* Card info area */
    .car-card-info {
      padding: 18px 20px 20px;
    }
    .car-card-top-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 16px;
    }
    .car-card-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 3px;
    }
    .car-card-type {
      font-size: 0.78rem;
      color: #999;
      font-weight: 400;
    }

    /* Availability label */
    .car-avail-label {
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
      padding: 4px 10px;
      border-radius: 20px;
    }
    .avail-yes {
      background: #f0fdf4;
      color: #16a34a;
    }
    .avail-no {
      background: #fef2f2;
      color: #dc2626;
    }

    /* Bottom row — price + button */
    .car-card-bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      border-top: 1px solid #f3f4f6;
    }
    .car-card-price {
      font-size: 1.4rem;
      font-weight: 800;
      color: #1a1a1a;
      letter-spacing: -0.02em;
    }
    .car-card-price span {
      font-size: 0.78rem;
      font-weight: 400;
      color: #aaa;
    }

    /* Rent button */
    .car-rent-btn {
      padding: 9px 20px;
      border-radius: 10px;
      border: 1.5px solid #e5e7eb;
      background: #fff;
      font-size: 13px;
      font-weight: 600;
      color: #1a1a1a;
      cursor: pointer;
      transition: all 0.2s;
    }
    .car-rent-btn:hover:not(:disabled) {
      background: #1a272d;
      color: #fff;
      border-color: #1a272d;
    }
    .car-rent-btn-disabled {
      background: #f9fafb;
      color: #ccc;
      border-color: #f0f0f0;
      cursor: not-allowed;
    }

    .cars-empty {
      color: #aaa;
      font-size: 0.95rem;
      padding: 32px 0;
      grid-column: 1 / -1;
    }
  `;
  document.head.appendChild(style);
}
