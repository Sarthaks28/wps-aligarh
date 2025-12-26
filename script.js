// --- Back to Top Button Functionality ---
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

// --- Scroll Entrance Animations ---
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

// --- Timeline Animation ---
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

// ==============================
// ✅ FINAL GALLERY EXPAND LOGIC
// ==============================
document.addEventListener("DOMContentLoaded", function () {

  // Create modal ONCE
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.innerHTML = `
    <span class="close-btn">&times;</span>
    <img src="" alt="Expanded image">
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const closeBtn = modal.querySelector(".close-btn");

  // Attach click to container (NOT image)
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
// ✅ SKILL CLICK → IMAGE POPUP (SAFE & ISOLATED)
// =================================================
document.addEventListener("DOMContentLoaded", function () {

  // Create SKILL modal (separate from gallery)
  const skillModal = document.createElement("div");
  skillModal.style.position = "fixed";
  skillModal.style.inset = "0";
  skillModal.style.background = "rgba(0,0,0,0.85)";
  skillModal.style.display = "none";
  skillModal.style.alignItems = "center";
  skillModal.style.justifyContent = "center";
  skillModal.style.zIndex = "10000";

  skillModal.innerHTML = `
    <span style="
      position:absolute;
      top:20px;
      right:30px;
      font-size:40px;
      color:#fff;
      cursor:pointer;
      font-weight:bold;
    ">&times;</span>

    <div style="text-align:center;color:white">
      <img style="
        max-width:90%;
        max-height:80vh;
        border-radius:20px;
        box-shadow:0 20px 40px rgba(0,0,0,0.4);
      ">
      <div id="skillModalCaption" style="
        margin-top:15px;
        font-size:1.2rem;
        font-weight:600;
      "></div>
    </div>
  `;

  document.body.appendChild(skillModal);

  const skillImg = skillModal.querySelector("img");
  const skillCaption = skillModal.querySelector("#skillModalCaption");
  const closeSkillBtn = skillModal.querySelector("span");

  // Attach click ONLY to skill items
  document.querySelectorAll(".skill-row-item").forEach(skill => {
    skill.addEventListener("click", () => {
      const imgSrc = skill.getAttribute("data-skill-img");
      if (!imgSrc) return;

      skillImg.src = imgSrc;
      skillCaption.textContent =
        skill.querySelector(".skill-text")?.innerText || "";

      skillModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Close logic
  closeSkillBtn.addEventListener("click", closeSkillModal);

  skillModal.addEventListener("click", (e) => {
    if (e.target === skillModal) closeSkillModal();
  });

  function closeSkillModal() {
    skillModal.style.display = "none";
    skillImg.src = "";
    skillCaption.textContent = "";
    document.body.style.overflow = "";
  }

});
