/* =========================================================
DOCTOR POSTER MAKER
HOMEPAGE SCRIPT
========================================================= */

/* =========================================================
STORAGE KEYS
========================================================= */

const WEBSITE_STORAGE_KEY =
"doctorPosterWebsiteSettings";

const DESIGN_STORAGE_KEY =
"doctorPosterDesignStatus";

const AD_STORAGE_KEY =
"doctorPosterAdvertisement";

const SYSTEM_STORAGE_KEY =
"doctorPosterSystemSettings";

/* =========================================================
DEFAULT WEBSITE SETTINGS
========================================================= */

const defaultWebsiteSettings = {

websiteName:
    "Doctor Poster Maker",

websiteTagline:
    "Create professional doctor posters in minutes.",

heroBadge:
    "✦ Built for Healthcare Professionals",

heroTitle:
    "Create Beautiful Doctor Posters in Minutes.",

heroDescription:
    "Create professional medical posters quickly with beautiful ready-made designs built for healthcare professionals.",

primaryButton:
    "Start Creating →",

secondaryButton:
    "Explore Designs",

stat1:
    "4+ Designs",

stat2:
    "1080px Quality",

footerDescription:
    "Create beautiful professional doctor posters quickly and easily.",

copyrightText:
    "© 2026 Doctor Poster Maker",

contactEmail:
    "",

websiteEnabled:
    true

};

/* =========================================================
DEFAULT DESIGN STATUS
========================================================= */

const defaultDesignStatus = {

design1: true,
design2: true,
design3: true,
design4: true

};

/* =========================================================
DEFAULT ADVERTISEMENT
========================================================= */

const defaultAdvertisement = {

enabled:
    true,

label:
    "Advertisement",

title:
    "Promote Your Healthcare Brand",

description:
    "Reach doctors, clinics & healthcare professionals",

buttonText:
    "Advertise With Us →",

buttonLink:
    "#",

backgroundColor:
    "#087f86",

buttonColor:
    "#ffffff",

showCloseButton:
    true,

image:
    ""

};

/* =========================================================
DEFAULT SYSTEM SETTINGS
========================================================= */

const defaultSystemSettings = {

websiteStatus:
    true,

maintenanceMode:
    false,

posterCreation:
    true,

advertisementSystem:
    true

};

/* =========================================================
SAFE LOCAL STORAGE READER
========================================================= */

function getLocalStorageData(
key,
fallback
) {

const saved =
    localStorage.getItem(key);


if (!saved) {

    return {
        ...fallback
    };

}


try {

    const parsed =
        JSON.parse(saved);


    return {

        ...fallback,

        ...parsed

    };

} catch (error) {

    console.error(
        "Local storage read error:",
        key,
        error
    );


    return {
        ...fallback
    };

}

}

/* =========================================================
WEBSITE SETTINGS
========================================================= */

function loadWebsiteSettings() {

const settings =
    getLocalStorageData(
        WEBSITE_STORAGE_KEY,
        defaultWebsiteSettings
    );


/* -----------------------------------------
   TEXT ELEMENTS
----------------------------------------- */

setText(
    "navWebsiteName",
    settings.websiteName
);

setText(
    "navTagline",
    settings.websiteTagline
);

setText(
    "heroBadge",
    settings.heroBadge
);

setText(
    "heroTitle",
    settings.heroTitle
);

setText(
    "heroDescription",
    settings.heroDescription
);

setText(
    "primaryButton",
    settings.primaryButton
);

setText(
    "secondaryButton",
    settings.secondaryButton
);

setText(
    "stat1",
    settings.stat1
);

setText(
    "stat2",
    settings.stat2
);

setText(
    "footerWebsiteName",
    settings.websiteName
);

setText(
    "footerDescription",
    settings.footerDescription
);

setText(
    "copyrightText",
    settings.copyrightText
);


/* -----------------------------------------
   PAGE TITLE
----------------------------------------- */

if (
    settings.websiteName &&
    settings.websiteName.trim() !== ""
) {

    document.title =
        settings.websiteName;

}


/* -----------------------------------------
   CONTACT EMAIL
----------------------------------------- */

const contactLink =
    document.getElementById(
        "footerContactEmail"
    );


if (contactLink) {

    if (
        settings.contactEmail &&
        settings.contactEmail.trim() !== ""
    ) {

        contactLink.textContent =
            settings.contactEmail;

        contactLink.href =
            "mailto:" +
            settings.contactEmail;

    } else {

        contactLink.textContent =
            "Contact Us";

        contactLink.href =
            "#";

    }

}


/* -----------------------------------------
   HERO BUTTONS
----------------------------------------- */

const primary =
    document.getElementById(
        "primaryButton"
    );


if (primary) {

    primary.href =
        "#designs";

}


const secondary =
    document.getElementById(
        "secondaryButton"
    );


if (secondary) {

    secondary.href =
        "#designs";

}


/* -----------------------------------------
   WEBSITE STATUS
----------------------------------------- */

applyWebsiteStatus(
    settings.websiteEnabled
);

}

/* =========================================================
SET TEXT SAFELY
========================================================= */

function setText(
elementId,
value
) {

const element =
    document.getElementById(
        elementId
    );


if (!element) {

    return;

}


if (
    value === undefined ||
    value === null ||
    value === ""
) {

    return;

}


element.textContent =
    value;

}

/* =========================================================
WEBSITE STATUS
========================================================= */

function applyWebsiteStatus(
websiteEnabled
) {

const websiteContent =
    document.getElementById(
        "websiteContent"
    );


const offline =
    document.getElementById(
        "websiteOffline"
    );


if (
    !websiteContent ||
    !offline
) {

    return;

}


if (
    websiteEnabled === false
) {

    websiteContent.style.display =
        "none";

    offline.style.display =
        "flex";

    document.body.classList.add(
        "website-disabled"
    );

} else {

    websiteContent.style.display =
        "";

    offline.style.display =
        "none";

    document.body.classList.remove(
        "website-disabled"
    );

}

}

/* =========================================================
DESIGN MANAGEMENT
========================================================= */

function loadDesignStatus() {

const status =
    getLocalStorageData(
        DESIGN_STORAGE_KEY,
        defaultDesignStatus
    );


const designCards =
    document.querySelectorAll(
        "[data-design-card]"
    );


let activeCount =
    0;


designCards.forEach(
    card => {

        const designId =
            card.getAttribute(
                "data-design-card"
            );


        const isActive =
            status[designId] !== false;


        if (isActive) {

            card.classList.remove(
                "design-hidden"
            );

            card.style.display =
                "";

            activeCount++;

        } else {

            card.classList.add(
                "design-hidden"
            );

            card.style.display =
                "none";

        }

    }
);


/* -----------------------------------------
   DESIGN COUNT
----------------------------------------- */

const countElement =
    document.getElementById(
        "designCountStat"
    );


if (countElement) {

    countElement.textContent =
        activeCount;

}


/* -----------------------------------------
   NO DESIGN MESSAGE
----------------------------------------- */

const noDesignMessage =
    document.getElementById(
        "noDesignMessage"
    );


if (noDesignMessage) {

    if (
        activeCount === 0
    ) {

        noDesignMessage.style.display =
            "block";

    } else {

        noDesignMessage.style.display =
            "none";

    }

}


/* -----------------------------------------
   UPDATE STAT 1
   Only if admin hasn't set a custom value.
----------------------------------------- */

if (
    !localStorage.getItem(
        WEBSITE_STORAGE_KEY
    )
) {

    setText(
        "stat1",
        activeCount + "+ Designs"
    );

}

}

/* =========================================================
OPEN DESIGN
========================================================= */

function openDesign(
design
) {

if (!design) {

    return;

}


const status =
    getLocalStorageData(
        DESIGN_STORAGE_KEY,
        defaultDesignStatus
    );


if (
    status[design] === false
) {

    alert(
        "This design is currently unavailable."
    );

    return;

}


/*
 * Check Poster Creation system setting.
 */

const system =
    getLocalStorageData(
        SYSTEM_STORAGE_KEY,
        defaultSystemSettings
    );


if (
    system.posterCreation === false
) {

    alert(
        "Poster creation is currently disabled by the administrator."
    );

    return;

}


window.location.href =
    design + "/index.html";

}

/* =========================================================
DESIGN BUTTONS
========================================================= */

function setupDesignButtons() {

const buttons =
    document.querySelectorAll(
        "[data-design]"
    );


buttons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                const design =
                    this.getAttribute(
                        "data-design"
                    );


                openDesign(
                    design
                );

            }
        );

    }
);

}

/* =========================================================
MOBILE MENU
========================================================= */

function setupMobileMenu() {

const menuButton =
    document.getElementById(
        "mobileMenuBtn"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (
    !menuButton ||
    !mobileMenu
) {

    return;

}


menuButton.addEventListener(
    "click",
    function () {

        mobileMenu.classList.toggle(
            "active"
        );


        this.classList.toggle(
            "active"
        );

    }
);


const links =
    mobileMenu.querySelectorAll(
        "a"
    );


links.forEach(
    link => {

        link.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove(
                    "active"
                );


                menuButton.classList.remove(
                    "active"
                );

            }
        );

    }
);

}

/* =========================================================
NAVBAR SCROLL EFFECT
========================================================= */

function setupNavbarScroll() {

const navbar =
    document.getElementById(
        "navbar"
    );


if (!navbar) {

    return;

}


function updateNavbar() {

    if (
        window.scrollY > 20
    ) {

        navbar.classList.add(
            "scrolled"
        );

    } else {

        navbar.classList.remove(
            "scrolled"
        );

    }

}


updateNavbar();


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);

}

/* =========================================================
ACTIVE NAVIGATION
========================================================= */

function setupActiveNavigation() {

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


if (
    sections.length === 0 ||
    navLinks.length === 0
) {

    return;

}


function updateActiveNav() {

    let currentSection =
        "home";


    sections.forEach(
        section => {

            const top =
                section.offsetTop - 180;


            const bottom =
                top + section.offsetHeight;


            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href === "#" +
                currentSection
            ) {

                link.classList.add(
                    "active"
                );

            } else {

                link.classList.remove(
                    "active"
                );

            }

        }
    );

}


updateActiveNav();


window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);

}

/* =========================================================
SMOOTH SCROLL
========================================================= */

function setupSmoothScroll() {

const links =
    document.querySelectorAll(
        'a[href^="#"]'
    );


links.forEach(
    link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);

}

/* =========================================================
ADVERTISEMENT
========================================================= */

function loadAdvertisement() {

const banner =
    document.getElementById(
        "topAdBanner"
    );


if (!banner) {

    return;

}


/* -----------------------------------------
   READ AD SETTINGS
----------------------------------------- */

const ad =
    getLocalStorageData(
        AD_STORAGE_KEY,
        defaultAdvertisement
    );


/* -----------------------------------------
   READ SYSTEM SETTINGS
----------------------------------------- */

const system =
    getLocalStorageData(
        SYSTEM_STORAGE_KEY,
        defaultSystemSettings
    );


/* -----------------------------------------
   ADVERTISEMENT SYSTEM CHECK
   
   BOTH must be enabled:
   1. Advertisement System
   2. Individual Advertisement
----------------------------------------- */

const advertisementSystemEnabled =
    system.advertisementSystem !== false;


const advertisementEnabled =
    ad.enabled !== false;


if (
    !advertisementSystemEnabled ||
    !advertisementEnabled
) {

    banner.style.display =
        "none";

    return;

}


/* -----------------------------------------
   SHOW BANNER
----------------------------------------- */

banner.style.display =
    "";


/* -----------------------------------------
   BACKGROUND COLOR
----------------------------------------- */

if (
    ad.backgroundColor
) {

    banner.style.backgroundColor =
        ad.backgroundColor;

}


/* -----------------------------------------
   TEXT
----------------------------------------- */

setText(
    "adLabel",
    ad.label
);


setText(
    "adTitle",
    ad.title
);


setText(
    "adDescription",
    ad.description
);


setText(
    "adButton",
    ad.buttonText
);


/* -----------------------------------------
   BUTTON LINK
----------------------------------------- */

const adButton =
    document.getElementById(
        "adButton"
    );


if (adButton) {

    adButton.href =
        ad.buttonLink &&
        ad.buttonLink !== ""
            ? ad.buttonLink
            : "#";


    if (
        ad.buttonLink &&
        ad.buttonLink !== "#" &&
        (
            ad.buttonLink.startsWith(
                "http://"
            ) ||
            ad.buttonLink.startsWith(
                "https://"
            )
        )
    ) {

        adButton.target =
            "_blank";

        adButton.rel =
            "noopener noreferrer";

    } else {

        adButton.target =
            "_self";

    }

}


/* -----------------------------------------
   BUTTON COLOR
----------------------------------------- */

if (
    adButton &&
    ad.buttonColor
) {

    adButton.style.backgroundColor =
        ad.buttonColor;


    if (
        ad.buttonColor.toLowerCase() ===
        "#ffffff"
    ) {

        adButton.style.color =
            "#087f86";

    } else {

        adButton.style.color =
            "#ffffff";

    }

}


/* -----------------------------------------
   AD IMAGE
----------------------------------------- */

const imageWrap =
    document.getElementById(
        "adImageWrap"
    );


const image =
    document.getElementById(
        "adImage"
    );


const adIcon =
    document.getElementById(
        "adIcon"
    );


if (
    imageWrap &&
    image &&
    ad.image &&
    ad.image !== ""
) {

    image.src =
        ad.image;


    imageWrap.style.display =
        "block";


    if (adIcon) {

        adIcon.style.display =
            "none";

    }

} else {

    if (imageWrap) {

        imageWrap.style.display =
            "none";

    }


    if (adIcon) {

        adIcon.style.display =
            "flex";

    }

}


/* -----------------------------------------
   CLOSE BUTTON
----------------------------------------- */

const closeButton =
    document.getElementById(
        "adClose"
    );


if (closeButton) {

    if (
        ad.showCloseButton === false
    ) {

        closeButton.style.display =
            "none";

    } else {

        closeButton.style.display =
            "flex";

    }

}

}

/* =========================================================
ADVERTISEMENT CLOSE
========================================================= */

function setupAdvertisementClose() {

const closeButton =
    document.getElementById(
        "adClose"
    );


const banner =
    document.getElementById(
        "topAdBanner"
    );


if (
    !closeButton ||
    !banner
) {

    return;

}


closeButton.addEventListener(
    "click",
    function () {

        banner.style.display =
            "none";

    }
);

}

/* =========================================================
ESCAPE KEY
========================================================= */

function setupEscapeKey() {

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const mobileMenuButton =
            document.getElementById(
                "mobileMenuBtn"
            );


        if (mobileMenu) {

            mobileMenu.classList.remove(
                "active"
            );

        }


        if (mobileMenuButton) {

            mobileMenuButton.classList.remove(
                "active"
            );

        }

    }
);

}

/* =========================================================
STORAGE CHANGE
Sync Admin Panel → Homepage
========================================================= */

window.addEventListener(
"storage",
function (event) {

    /* -----------------------------------------
       WEBSITE SETTINGS
    ----------------------------------------- */

    if (
        event.key ===
        WEBSITE_STORAGE_KEY
    ) {

        loadWebsiteSettings();

    }


    /* -----------------------------------------
       DESIGN STATUS
    ----------------------------------------- */

    if (
        event.key ===
        DESIGN_STORAGE_KEY
    ) {

        loadDesignStatus();

    }


    /* -----------------------------------------
       INDIVIDUAL ADVERTISEMENT
    ----------------------------------------- */

    if (
        event.key ===
        AD_STORAGE_KEY
    ) {

        loadAdvertisement();

    }


    /* -----------------------------------------
       SYSTEM SETTINGS
       
       This includes:
       - Website Status
       - Maintenance Mode
       - Poster Creation
       - Advertisement System
    ----------------------------------------- */

    if (
        event.key ===
        SYSTEM_STORAGE_KEY
    ) {

        loadWebsiteSettings();

        loadAdvertisement();

    }

}

);

/* =========================================================
INITIALIZE WEBSITE
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

    loadWebsiteSettings();

    loadDesignStatus();

    loadAdvertisement();

    setupDesignButtons();

    setupMobileMenu();

    setupNavbarScroll();

    setupActiveNavigation();

    setupSmoothScroll();

    setupAdvertisementClose();

    setupEscapeKey();

}

);
