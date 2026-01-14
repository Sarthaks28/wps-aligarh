// =================================================
// 1. BACK TO TOP BUTTON FUNCTIONALITY
// =================================================
let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =================================================
// 2. SCROLL ENTRANCE & TIMELINE ANIMATIONS
// =================================================
const observerOptions = { root: null, threshold: 0.2 };

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
};

const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
document.querySelectorAll(".animate-on-scroll").forEach(el => {
  scrollObserver.observe(el);
});

document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.15 });

  timelineItems.forEach(item => timelineObserver.observe(item));
});

// =================================================
// 3. FINAL GALLERY EXPAND LOGIC
// =================================================
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.innerHTML = `
    <span class="close-btn">&times;</span>
    <img src="" alt="Expanded image">
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const closeBtn = modal.querySelector(".close-btn");

  document.querySelectorAll(".img-hover-zoom").forEach(box => {
    box.addEventListener("click", () => {
      const img = box.querySelector("img");
      modalImg.src = img.src;
      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    modalImg.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      modalImg.src = "";
    }
  });
});

// =================================================
// 4. SKILL CLICK → IMAGE POPUP (SAFE & ISOLATED)
// =================================================
document.addEventListener("DOMContentLoaded", function () {
  const skillModal = document.createElement("div");
  skillModal.style.position = "fixed";
  skillModal.style.inset = "0";
  skillModal.style.background = "rgba(0,0,0,0.85)";
  skillModal.style.display = "none";
  skillModal.style.alignItems = "center";
  skillModal.style.justifyContent = "center";
  skillModal.style.zIndex = "10000";

  skillModal.innerHTML = `
    <span style="position:absolute;top:20px;right:30px;font-size:40px;color:#fff;cursor:pointer;font-weight:bold;">&times;</span>
    <div style="text-align:center;color:white">
      <img style="max-width:90%;max-height:80vh;border-radius:20px;box-shadow:0 20px 40px rgba(0,0,0,0.4);">
      <div id="skillModalCaption" style="margin-top:15px;font-size:1.2rem;font-weight:600;"></div>
    </div>
  `;

  document.body.appendChild(skillModal);

  const skillImg = skillModal.querySelector("img");
  const skillCaption = skillModal.querySelector("#skillModalCaption");
  const closeSkillBtn = skillModal.querySelector("span");

  document.querySelectorAll(".skill-row-item").forEach(skill => {
    skill.addEventListener("click", () => {
      const imgSrc = skill.getAttribute("data-skill-img");
      if (!imgSrc) return;
      skillImg.src = imgSrc;
      skillCaption.textContent = skill.querySelector(".skill-text")?.innerText || "";
      skillModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeSkillBtn.addEventListener("click", closeSkillModal);
  skillModal.addEventListener("click", (e) => { if (e.target === skillModal) closeSkillModal(); });

  function closeSkillModal() {
    skillModal.style.display = "none";
    skillImg.src = "";
    skillCaption.textContent = "";
    document.body.style.overflow = "";
  }
});

// =================================================
// 5. PANCHAKOSH CARDS & PORTAL LOGIC
// =================================================
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.panchakosh-collage');
    const cards = document.querySelectorAll('.kosha-card');

    if (container) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('active');
                container.classList.add('focused');
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('active');
                container.classList.remove('focused');
            });
            card.addEventListener('touchstart', function() {
                cards.forEach(c => { if(c !== card) c.classList.remove('active'); });
                card.classList.toggle('active');
                container.classList.add('focused');
            });
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
    }, { threshold: 0.15 });

    document.querySelectorAll(".play-card").forEach(card => revealObserver.observe(card));

    const parallaxItems = document.querySelectorAll('.parallax-item');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        parallaxItems.forEach((item, index) => {
            let speed = (index + 1) * 0.1;
            item.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
});

// =================================================
// 6. MAGIC PORTAL BUBBLES
// =================================================
document.addEventListener("DOMContentLoaded", function () {
    const portalHero = document.querySelector('.magic-portal-hero');
    const bubbles = document.querySelectorAll('.energy-bubble');

    if (portalHero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    portalHero.classList.add('portal-active');
                    observer.unobserve(portalHero);
                }
            });
        }, { threshold: 0.4 });
        observer.observe(portalHero);
    }

    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() { this.classList.add('pop'); });
        bubble.addEventListener('click', function() { this.classList.add('pop'); });
        bubble.addEventListener('animationend', function(e) {
            if (e.animationName === 'bubblePop') { this.style.display = 'none'; }
        });
    });
});

// =================================================
// 7. ✅ AUTOMATIC MAGIC STORYBOOK (FLIPPING FIXED)
// =================================================
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    // Master timeline to flip all pages automatically as you scroll
    const bookTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".storybook-hero",
            start: "top 10%", 
            end: "+=1500", // Fast scroll range
            scrub: 1,      // Connects flipping speed to scroll
            pin: true,     // PINS THE BOOK so it turns in center
            anticipatePin: 1
        }
    });

    // Function to handle z-index swap so pages don't block each other
    function animateFlip(id, zBefore, zAfter) {
        bookTl.to(id, { 
            rotateY: -175, 
            duration: 2,
            onUpdate: function() {
                // Swap z-index halfway to ensure visibility of current page
                if(this.progress() > 0.5) document.querySelector(id).style.zIndex = zAfter;
                else document.querySelector(id).style.zIndex = zBefore;
            }
        })
        .to(`${id} .pop-icon`, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2)" }, "-=1");
    }

   
});
// ================================
// 🌈 RAINBOW SKY SCROLL EXIT
// ================================
window.addEventListener("scroll", () => {
  const sky = document.getElementById("rainbow-welcome-sky");
  if (!sky) return;

  const scrollY = window.scrollY;
  sky.style.transform = `translateY(-${scrollY * 0.4}px)`;
  sky.style.opacity = Math.max(1 - scrollY / 400, 0);
});
