const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      if (entry.target.id === "quote") {
        entry.target.classList.add("animate");
      }

      if (entry.target.classList.contains("villain")) {
        if (
          entry.target.classList.contains("kai") ||
          entry.target.classList.contains("tailung")
        ) {
          entry.target.classList.add("animate-left");
        } else if (entry.target.classList.contains("peacock")) {
          entry.target.classList.add("animate-right");
        }
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".scroll-animate").forEach((el) => {
  observer.observe(el);
});

let currentSlide = 0;
const slides = document.querySelectorAll(".slides img");
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.animationDelay = i === index ? "0s" : "-1s";
  });
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function startSlideshow() {
  slideInterval = setInterval(nextSlide, 2000);
}

function stopSlideshow() {
  clearInterval(slideInterval);
}

let touchStartX = 0;
let touchEndX = 0;

const slidesContainer = document.querySelector(".slides");

slidesContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slidesContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide();
    stopSlideshow();
    setTimeout(startSlideshow, 3000);
  }
  if (touchEndX > touchStartX + 50) {
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
    stopSlideshow();
    setTimeout(startSlideshow, 3000);
  }
}

startSlideshow();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

document.querySelector(".hero-text button").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#quote").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    let ripple = document.createElement("span");
    let rect = this.getBoundingClientRect();
    let size = Math.max(rect.width, rect.height);
    let x = e.clientX - rect.left - size / 2;
    let y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

const rippleCSS = `
        .ripple {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;

const style = document.createElement("style");
style.textContent = rippleCSS;
document.head.appendChild(style);
