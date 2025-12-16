// --- Back to Top Button Functionality ---
let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // Show button after scrolling down 100px
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  // Smooth scroll to top
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// --- Scroll Entrance Animations (Generic) ---

// 1. Setup options for the observer
const observerOptions = {
    root: null, // use browser viewport
    threshold: 0.2 
};

// 2. Define the callback function
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

// 3. Create the observer instance
const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

// 4. Target all elements with the class '.animate-on-scroll'
const targetElements = document.querySelectorAll('.animate-on-scroll');
targetElements.forEach(el => {
    scrollObserver.observe(el);
});

// --- Timeline Specific Animation ---
// This handles the slide-in effect for the timeline items left and right
document.addEventListener("DOMContentLoaded", function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set opacity to 1 and remove the Y-translation to slide it into place
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15 // Trigger a bit earlier than 20%
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});