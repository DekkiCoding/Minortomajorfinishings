document.querySelectorAll(".before-after").forEach(section => {
    const img = section.querySelector(".baImage");
    const btn = section.querySelector(".baToggle");

    let showingAfter = false;

    btn.addEventListener("click", () => {
        showingAfter = !showingAfter;

        img.src = showingAfter ? img.dataset.after : img.dataset.before;
        btn.textContent = showingAfter ? "Show Before" : "Show After";
    });
});

const images = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

// Open lightbox
images.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

// Close lightbox when clicking background
lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
        lightboxImg.src = "";
    }
});

document.querySelectorAll(".about-img-carousel").forEach(carousel => {
    const slides = carousel.querySelectorAll(".about-slide");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");

    let index = 0;

    function showSlide(i) {
        slides.forEach(s => s.classList.remove("active"));
        slides[i].classList.add("active");
    }

    next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    });

    showSlide(index);
});

document.querySelectorAll(".before-after").forEach(section => {
    const img = section.querySelector(".baImage");
    const btn = section.querySelector(".baToggle");
    const label = section.querySelector(".ba-label");

    let showingAfter = false;

    btn.addEventListener("click", () => {
        showingAfter = !showingAfter;

        img.src = showingAfter ? img.dataset.after : img.dataset.before;
        btn.textContent = showingAfter ? "Show Before" : "Show After";

        label.textContent = showingAfter ? "After" : "Before";
    });
});

