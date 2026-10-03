/* =========================================
   DOCTOR POSTER MAKER
   HOMEPAGE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    const menu = document.getElementById("mobileNav");

    if (!menu) return;

    menu.classList.toggle("show");
}


function closeMenu() {

    const menu = document.getElementById("mobileNav");

    if (!menu) return;

    menu.classList.remove("show");
}


/* =========================================
   SCROLL TO DESIGNS
========================================= */

function scrollToDesigns() {

    const designs = document.getElementById("designs");

    if (!designs) return;

    designs.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================
   OPEN POSTER DESIGN
========================================= */

function openDesign(design) {

    /*
        Folder structure:

        design1/index.html
        design2/index.html
        design3/index.html
        design4/index.html
    */

    if (!design) return;

    window.location.href = design + "/index.html";
}


/* =========================================
   HEADER CREATE BUTTON
========================================= */

const headerButton = document.querySelector(".header-btn");

if (headerButton) {

    headerButton.addEventListener("click", function(event) {

        event.preventDefault();

        scrollToDesigns();

    });

}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        closeMenu();

    });

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/* =========================================
   CLOSE MOBILE MENU
   WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", function(event) {

    const menu = document.getElementById("mobileNav");
    const menuButton = document.querySelector(".menu-btn");

    if (!menu || !menuButton) return;

    const clickedInsideMenu = menu.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {

        closeMenu();

    }

});


/* =========================================
   DESIGN BUTTONS
========================================= */

const designButtons = document.querySelectorAll(".use-btn");

designButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const design = button.getAttribute("data-design");

        if (design) {

            openDesign(design);

        }

    });

});


/* =========================================
   CTA BUTTON
========================================= */

const ctaButton = document.querySelector(".cta button");

if (ctaButton) {

    ctaButton.addEventListener("click", function() {

        scrollToDesigns();

    });

}


/* =========================================
   HEADER SHADOW ON SCROLL
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", function() {

    if (!header) return;

    if (window.scrollY > 20) {

        header.style.boxShadow =
            "0 10px 35px rgba(18,52,59,.10)";

    } else {

        header.style.boxShadow =
            "0 8px 35px rgba(18,52,59,.06)";

    }

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", function() {

    let currentSection = "";

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(function(link) {

        link.style.color = "";

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.style.color = "#087f86";

        }

    });

});


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    console.log("Doctor Poster Maker Homepage Loaded ✓");

});
