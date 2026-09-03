const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("mobile-open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu when link is clicked */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   SEARCH
========================= */

const searchBtn = document.getElementById("searchBtn");
const heroSearch = document.getElementById("heroSearch");
const searchCategory = document.getElementById("searchCategory");

function performSearch() {

    const query = heroSearch.value.trim();
    const category = searchCategory.value;

    if (query === "" && category === "all") {

        showToast("Please enter a service or choose a category.");

        heroSearch.focus();

        return;
    }

    let message = "";

    if (query !== "" && category !== "all") {

        message = `Searching for "${query}" in ${category}...`;

    } else if (query !== "") {

        message = `Searching for "${query}"...`;

    } else {

        message = `Showing ${category} services...`;

    }

    showToast(message);

    document.getElementById("freelancers").scrollIntoView({
        behavior: "smooth"
    });

}

searchBtn.addEventListener("click", performSearch);


/* Enter key search */

heroSearch.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        performSearch();
    }

});


/* =========================
   POPULAR SEARCH BUTTONS
========================= */

const popularButtons =
    document.querySelectorAll(".popular-searches button");

popularButtons.forEach(button => {

    button.addEventListener("click", () => {

        const searchValue = button.dataset.search;

        heroSearch.value = searchValue;

        searchCategory.value = "all";

        performSearch();

    });

});


/* =========================
   CATEGORY CARDS
========================= */

const categoryCards =
    document.querySelectorAll(".category-card");

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category = card.querySelector("h3").textContent;

        heroSearch.value = category;

        searchCategory.value = "all";

        showToast(`Searching for ${category}...`);

        document.getElementById("freelancers").scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================
   FREELANCER FILTER
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const freelancerCards =
    document.querySelectorAll(".freelancer-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        freelancerCards.forEach(card => {

            if (filter === "all") {

                card.style.display = "block";

            } else if (card.dataset.role === filter) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================
   FAVORITE BUTTONS
========================= */

const favoriteButtons =
    document.querySelectorAll(".favorite");

favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        const icon = button.querySelector("i");

        if (button.classList.contains("liked")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            showToast("Freelancer added to favorites.");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            showToast("Removed from favorites.");

        }

    });

});


/* =========================
   VIEW PROFILE
========================= */

const profileButtons =
    document.querySelectorAll(".view-profile");

profileButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".freelancer-card");

        const name = card.querySelector("h3").textContent;

        showToast(`Opening ${name}'s profile...`);

    });

});


/* =========================
   LOGIN / REGISTER MODALS
========================= */

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

const loginButtons =
    document.querySelectorAll(".open-login");

const registerButtons =
    document.querySelectorAll(".open-register");


function openModal(modal) {

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeModal(modal) {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


loginButtons.forEach(button => {

    button.addEventListener("click", () => {

        openModal(loginModal);

    });

});


registerButtons.forEach(button => {

    button.addEventListener("click", () => {

        openModal(registerModal);

    });

});


/* Close buttons */

document.querySelectorAll(".close-modal").forEach(button => {

    button.addEventListener("click", () => {

        closeModal(loginModal);
        closeModal(registerModal);

    });

});


/* Click outside modal */

window.addEventListener("click", event => {

    if (event.target === loginModal) {
        closeModal(loginModal);
    }

    if (event.target === registerModal) {
        closeModal(registerModal);
    }

});


/* Escape key */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal(loginModal);
        closeModal(registerModal);

    }

});


/* Switch Login -> Register */

document.querySelector(".switch-register")
    .addEventListener("click", () => {

        closeModal(loginModal);
        openModal(registerModal);

    });


/* Switch Register -> Login */

document.querySelector(".switch-login")
    .addEventListener("click", () => {

        closeModal(registerModal);
        openModal(loginModal);

    });


/* =========================
   LOGIN FORM
========================= */

loginModal.querySelector("form")
    .addEventListener("submit", event => {

        event.preventDefault();

        closeModal(loginModal);

        showToast("Login successful! Welcome back.");

        event.target.reset();

    });


/* =========================
   REGISTER FORM
========================= */

registerModal.querySelector("form")
    .addEventListener("submit", event => {

        event.preventDefault();

        closeModal(registerModal);

        showToast("Account created successfully!");

        event.target.reset();

    });


/* =========================
   TOAST
========================= */

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================
   NAV ACTIVE LINK
========================= */

const sections =
    document.querySelectorAll("main section[id]");

const navAnchors =
    document.querySelectorAll(".nav-links > a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navAnchors.forEach(anchor => {

        anchor.classList.remove("active");

        if (anchor.getAttribute("href") === `#${currentSection}`) {
            anchor.classList.add("active");
        }

    });

});


/* =========================
   CTA BUTTONS
========================= */

document.querySelector(".cta-secondary")
    .addEventListener("click", () => {

        document.getElementById("freelancers")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================
   INITIAL MESSAGE
========================= */

console.log(
    "Skillora Freelancing Marketplace loaded successfully."
);