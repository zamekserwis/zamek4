
document.querySelectorAll('.social-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        this.classList.toggle('open');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const headerBurger = document.querySelector('.header-burger');
    const menuMobileOverlay = document.querySelector('.menu-mobile__overlay');
    const menuMobileClose = document.querySelector('.menu-mobile__close');
    const menuMobileLinks = document.querySelectorAll('.menu-mobile__link');
    const burgerSection = document.querySelector('.burger-section');
    const menuMobile = document.querySelector('.menu-mobile');
    const body = document.body;
    const modal = document.getElementById('myModal');

    function toggleMenu() {
        if (headerBurger) headerBurger.classList.toggle('active');
        if (burgerSection) burgerSection.classList.toggle('active');
        if (menuMobile) menuMobile.classList.toggle('active');
        if (body) body.classList.toggle('no-scroll');
        if (modal) modal.classList.remove('active');
    }

    if (headerBurger) headerBurger.addEventListener('click', toggleMenu);
    if (menuMobileOverlay) menuMobileOverlay.addEventListener('click', toggleMenu);
    if (menuMobileClose) menuMobileClose.addEventListener('click', toggleMenu);
    
    menuMobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    if (typeof WOW === 'function') {
        new WOW().init();
    }

    let sectionOffsets = {
        '#section0': 0,
        '#section1': -90,
        '#section2': 100,
        '#section1-m': 100,
    };

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute('href'));
            let destination = target.offsetTop;
            let offsetTop = sectionOffsets[this.getAttribute('href')] || 20;


            let start = window.pageYOffset;
            let distance = destination - offsetTop - start;
            let duration = 1000;
            let startTime = null;

            function smoothScroll(currentTime) {
                if (startTime === null) startTime = currentTime;
                let timeElapsed = currentTime - startTime;
                let run = ease(timeElapsed, start, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(smoothScroll);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const swiperParams = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        slidesPerView: 2,
        spaceBetween: 40,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        speed: 500,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            489: {
                slidesPerView: 2,
            }
        },
    };

    const swiperContainer = document.querySelector('.mobile-cards-container');
    if (swiperContainer) {
        new Swiper(swiperContainer, swiperParams);
    }

    const swiperContainer2 = document.querySelector('.mobile-reviews-section-cards-container');
    if (swiperContainer2) {
        new Swiper(swiperContainer2, swiperParams);
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");
  let animated = false;
  const duration = 1500;

  function animateCounters() {
    if (animated) return;
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let start = null;

      function updateCounter(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        counter.textContent = Math.floor(progress * target);
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(updateCounter);
    });
    animated = true;
  }

  function isInViewport(elem) {
    const rect = elem.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function onScroll() {
    const block = document.querySelector(".wide-photo-block-grid");
    if (block && isInViewport(block)) {
      animateCounters();
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      item.classList.toggle("open", !isOpen);
      btn.classList.toggle("active", !isOpen);
      e.stopPropagation();
    });
  });

  document.addEventListener("click", function (e) {
    const faq = document.querySelector(".faq");
    if (!faq.contains(e.target)) {
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));
      document
        .querySelectorAll(".faq-question")
        .forEach((q) => q.classList.remove("active"));
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([54.352, 18.6466], 11); // Gdańsk

  // Подключаем тайлы
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  // === Уровни для кругов и маркеров ===
  map.createPane("circle-small");
  map.getPane("circle-small").style.zIndex = 650;

  map.createPane("circle-medium");
  map.getPane("circle-medium").style.zIndex = 640;

  map.createPane("circle-large");
  map.getPane("circle-large").style.zIndex = 630;

  map.createPane("marker-top");
  map.getPane("marker-top").style.zIndex = 700; // Самый верх

  // === GDAŃSK ===

  // L.marker([54.352, 18.6466], { pane: "marker-top" })
  //   .addTo(map)
  //   .bindPopup("Centrum Gdańska – nasz punkt startowy");

  L.circle([54.352, 18.6466], {
    radius: 3000,
    color: "#d2090a",
    fillColor: "#d2090a",
    fillOpacity: 0.25,
    pane: "circle-small",
  })
    .addTo(map)
    .bindPopup("Gdańsk – Obszar do 2 km<br>Dojeżdżamy w 5 minut!");

  L.circle([54.352, 18.6466], {
    radius: 8000,
    color: "#ffa500",
    fillColor: "#ffa500",
    fillOpacity: 0.18,
    pane: "circle-medium",
  })
    .addTo(map)
    .bindPopup("Gdańsk – Obszar do 5 km <br>Dojeżdżamy w 10 minut!");

  L.circle([54.352, 18.6466], {
    radius: 25000,
    color: "#042781",
    fillColor: "#042781",
    fillOpacity: 0.12,
    pane: "circle-large",
  })
    .addTo(map)
    .bindPopup("Gdańsk – Obszar do 25 km<br>Dojeżdżamy w 25 minut!");

  // === SOPOT ===

  // L.marker([54.352, 18.6466], { pane: "marker-top" }).addTo(map).bindPopup(`
  //   <div style="font-size: 14px;">
  //     <strong>ZAMEK Serwis PRO</strong><br>
  //     ul. Główna 12, Gdańsk<br>
  //     <span style="color: #f39c12;">★ ★ ★ ★ ★</span>
      
  //   </div>
  // `);

  L.circle([54.4417, 18.56], {
    radius: 1200,
    color: "#d2090a",
    fillColor: "#d2090a",
    fillOpacity: 0.25,
    pane: "circle-small",
  })
    .addTo(map)
    .bindPopup("Sopot – Obszar do 800 m<br>Dojeżdżamy w 5 minut!");

  L.circle([54.4417, 18.56], {
    radius: 3000,
    color: "#ffa500",
    fillColor: "#ffa500",
    fillOpacity: 0.18,
    pane: "circle-medium",
  })
    .addTo(map)
    .bindPopup("Sopot – Obszar do 2 km<br>Dojeżdżamy w 7 minut!");

    L.circle([54.3384, 18.5666], {
      radius: 2000,
      color: "#d2090a",
      fillColor: "#d2090a",
      fillOpacity: 0.2,
      pane: "circle-small",
    })
      .addTo(map)
      .bindPopup("Gdańsk Jasień – Obszar do 1.5 km<br>Dojeżdżamy w 5 minut!");
});