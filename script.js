/* =========================================================
   DOCTOR POSTER MAKER
   HOMEPAGE JAVASCRIPT
========================================================= */


/* =========================================================
   STORAGE KEYS
========================================================= */

const WEBSITE_KEY =
    "doctorPosterWebsiteSettings";

const DESIGN_KEY =
    "doctorPosterDesignStatus";

const AD_KEY =
    "doctorPosterAdvertisement";

const SYSTEM_KEY =
    "doctorPosterSystemSettings";

const BANNER_KEY =
    "doctorPosterBannerStatus";


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
   DEFAULT BROWSER UI ADVERTISEMENT
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
   DEFAULT BANNER STATUS
========================================================= */

const defaultBannerStatus = {

    banner1:
        true,

    banner2:
        true

};


/* =========================================================
   SAFE LOCAL STORAGE READER
========================================================= */

function readJSON(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);


        if (!value) {

            return {
                ...fallback
            };

        }


        const parsed =
            JSON.parse(value);


        if (
            parsed &&
            typeof parsed === "object"
        ) {

            return {
                ...fallback,
                ...parsed
            };

        }


        return {
            ...fallback
        };

    } catch (error) {

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
        readJSON(
            WEBSITE_KEY,
            defaultWebsiteSettings
        );


    const navWebsiteName =
        document.getElementById(
            "navWebsiteName"
        );

    const navTagline =
        document.getElementById(
            "navTagline"
        );

    const heroBadge =
        document.getElementById(
            "heroBadge"
        );

    const heroTitle =
        document.getElementById(
            "heroTitle"
        );

    const heroDescription =
        document.getElementById(
            "heroDescription"
        );

    const primaryButton =
        document.getElementById(
            "primaryButton"
        );

    const secondaryButton =
        document.getElementById(
            "secondaryButton"
        );

    const stat1 =
        document.getElementById(
            "stat1"
        );

    const stat2 =
        document.getElementById(
            "stat2"
        );

    const footerWebsiteName =
        document.getElementById(
            "footerWebsiteName"
        );

    const footerDescription =
        document.getElementById(
            "footerDescription"
        );

    const copyrightText =
        document.getElementById(
            "copyrightText"
        );

    const footerContactEmail =
        document.getElementById(
            "footerContactEmail"
        );


    if (navWebsiteName) {

        navWebsiteName.textContent =
            settings.websiteName;

    }


    if (navTagline) {

        navTagline.textContent =
            settings.websiteTagline;

    }


    if (heroBadge) {

        heroBadge.textContent =
            settings.heroBadge;

    }


    if (heroTitle) {

        heroTitle.textContent =
            settings.heroTitle;

    }


    if (heroDescription) {

        heroDescription.textContent =
            settings.heroDescription;

    }


    if (primaryButton) {

        primaryButton.textContent =
            settings.primaryButton;

    }


    if (secondaryButton) {

        secondaryButton.textContent =
            settings.secondaryButton;

    }


    if (stat1) {

        stat1.textContent =
            settings.stat1;

    }


    if (stat2) {

        stat2.textContent =
            settings.stat2;

    }


    if (footerWebsiteName) {

        footerWebsiteName.textContent =
            settings.websiteName;

    }


    if (footerDescription) {

        footerDescription.textContent =
            settings.footerDescription;

    }


    if (copyrightText) {

        copyrightText.textContent =
            settings.copyrightText;

    }


    if (footerContactEmail) {

        if (settings.contactEmail) {

            footerContactEmail.textContent =
                settings.contactEmail;

            footerContactEmail.href =
                "mailto:" + settings.contactEmail;

        } else {

            footerContactEmail.textContent =
                "Contact Us";

            footerContactEmail.href =
                "#";

        }

    }


    document.title =
        settings.websiteName;


    applyWebsiteStatus(
        settings.websiteEnabled
    );

}


/* =========================================================
   WEBSITE STATUS
========================================================= */

function applyWebsiteStatus(enabled) {

    const websiteContent =
        document.getElementById(
            "websiteContent"
        );

    const websiteOffline =
        document.getElementById(
            "websiteOffline"
        );


    if (
        !websiteContent ||
        !websiteOffline
    ) {
        return;
    }


    if (enabled === false) {

        websiteContent.style.display =
            "none";

        websiteOffline.style.display =
            "flex";

    } else {

        websiteContent.style.display =
            "";

        websiteOffline.style.display =
            "none";

    }

}


/* =========================================================
   DESIGN STATUS
========================================================= */

function loadDesignStatus() {

    const status =
        readJSON(
            DESIGN_KEY,
            defaultDesignStatus
        );


    const cards =
        document.querySelectorAll(
            "[data-design-card]"
        );


    let activeCount = 0;


    cards.forEach((card) => {

        const design =
            card.dataset.designCard;


        const active =
            status[design] !== false;


        if (active) {

            card.style.display =
                "";

            card.classList.remove(
                "inactive-card"
            );

            activeCount++;

        } else {

            card.style.display =
                "none";

            card.classList.add(
                "inactive-card"
            );

        }

    });


    const countElement =
        document.getElementById(
            "designCountStat"
        );


    if (countElement) {

        countElement.textContent =
            activeCount;

    }


    const noDesignMessage =
        document.getElementById(
            "noDesignMessage"
        );


    const designGrid =
        document.getElementById(
            "designGrid"
        );


    if (activeCount === 0) {

        if (designGrid) {

            designGrid.style.display =
                "none";

        }

        if (noDesignMessage) {

            noDesignMessage.style.display =
                "block";

        }

    } else {

        if (designGrid) {

            designGrid.style.display =
                "";

        }

        if (noDesignMessage) {

            noDesignMessage.style.display =
                "none";

        }

    }


    document
        .querySelectorAll("[data-design]")
        .forEach((button) => {

            const design =
                button.dataset.design;


            if (
                status[design] === false
            ) {

                button.disabled =
                    true;

                button.style.cursor =
                    "not-allowed";

            } else {

                button.disabled =
                    false;

                button.style.cursor =
                    "";

            }

        });

}


/* =========================================================
   SYSTEM SETTINGS
========================================================= */

function getSystemSettings() {

    return readJSON(
        SYSTEM_KEY,
        defaultSystemSettings
    );

}


/* =========================================================
   OPEN DESIGN
========================================================= */

function openDesign(design) {

    const designStatus =
        readJSON(
            DESIGN_KEY,
            defaultDesignStatus
        );


    if (
        designStatus[design] === false
    ) {

        alert(
            "This design is currently unavailable."
        );

        return;

    }


    const system =
        getSystemSettings();


    if (
        system.posterCreation === false
    ) {

        alert(
            "Poster Creation is currently disabled."
        );

        return;

    }


    window.location.href =
        design + "/index.html";

}


/* =========================================================
   DESIGN BUTTON EVENTS
========================================================= */

function setupDesignButtons() {

    document
        .querySelectorAll("[data-design]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                function () {

                    const design =
                        this.dataset.design;

                    openDesign(design);

                }
            );

        });

}


/* =========================================================
   BANNER STATUS
========================================================= */

function loadBannerStatus() {

    const status =
        readJSON(
            BANNER_KEY,
            defaultBannerStatus
        );


    const system =
        getSystemSettings();


    const bannerArea =
        document.getElementById(
            "homepageBannerArea"
        );


    const banner1 =
        document.getElementById(
            "homepageBanner1"
        );


    const banner2 =
        document.getElementById(
            "homepageBanner2"
        );


    if (!bannerArea) {
        return;
    }


    /*
        Advertisement System OFF
        means all homepage banners
        must be hidden.
    */

    if (
        system.advertisementSystem === false
    ) {

        bannerArea.style.display =
            "none";

        return;

    }


    let activeCount =
        0;


    if (banner1) {

        if (
            status.banner1 !== false
        ) {

            banner1.style.display =
                "";

            activeCount++;

        } else {

            banner1.style.display =
                "none";

        }

    }


    if (banner2) {

        if (
            status.banner2 !== false
        ) {

            banner2.style.display =
                "";

            activeCount++;

        } else {

            banner2.style.display =
                "none";

        }

    }


    /*
        If both banners are OFF,
        hide the complete banner area.
    */

    if (activeCount === 0) {

        bannerArea.style.display =
            "none";

    } else {

        bannerArea.style.display =
            "";

    }

}


/* =========================================================
   BROWSER UI ADVERTISEMENT
========================================================= */

function loadAdvertisement() {

    const ad =
        readJSON(
            AD_KEY,
            defaultAdvertisement
        );


    const system =
        getSystemSettings();


    const topAdBanner =
        document.getElementById(
            "topAdBanner"
        );


    if (!topAdBanner) {
        return;
    }


    /*
        Advertisement System OFF
        OR advertisement itself OFF
        => Browser UI ad hidden.
    */

    if (
        system.advertisementSystem === false ||
        ad.enabled === false
    ) {

        topAdBanner.style.display =
            "none";

        return;

    }


    topAdBanner.style.display =
        "";


    const adLabel =
        document.getElementById(
            "adLabel"
        );

    const adTitle =
        document.getElementById(
            "adTitle"
        );

    const adDescription =
        document.getElementById(
            "adDescription"
        );

    const adButton =
        document.getElementById(
            "adButton"
        );

    const adIcon =
        document.getElementById(
            "adIcon"
        );

    const adImageWrap =
        document.getElementById(
            "adImageWrap"
        );

    const adImage =
        document.getElementById(
            "adImage"
        );

    const adClose =
        document.getElementById(
            "adClose"
        );


    if (adLabel) {

        adLabel.textContent =
            ad.label;

    }


    if (adTitle) {

        adTitle.textContent =
            ad.title;

    }


    if (adDescription) {

        adDescription.textContent =
            ad.description;

    }


    if (adButton) {

        adButton.textContent =
            ad.buttonText;

        adButton.href =
            ad.buttonLink || "#";

        adButton.style.background =
            ad.buttonColor ||
            "#ffffff";

        adButton.style.color =
            ad.backgroundColor ||
            "#087f86";

    }


    topAdBanner.style.background =
        ad.backgroundColor ||
        "#087f86";


    /*
        Advertisement image
    */

    if (
        ad.image &&
        adImage &&
        adImageWrap
    ) {

        adImage.src =
            ad.image;

        adImageWrap.style.display =
            "block";

        if (adIcon) {

            adIcon.style.display =
                "none";

        }

    } else {

        if (adImageWrap) {

            adImageWrap.style.display =
                "none";

        }

        if (adIcon) {

            adIcon.style.display =
                "flex";

        }

    }


    /*
        Advertisement close button
    */

    if (adClose) {

        adClose.style.display =
            ad.showCloseButton === false
                ? "none"
                : "flex";

    }

}


/* =========================================================
   ADVERTISEMENT CLOSE
========================================================= */

function setupAdvertisementClose() {

    const adClose =
        document.getElementById(
            "adClose"
        );


    const topAdBanner =
        document.getElementById(
            "topAdBanner"
        );


    if (
        !adClose ||
        !topAdBanner
    ) {
        return;
    }


    adClose.addEventListener(
        "click",
        function () {

            topAdBanner.style.display =
                "none";

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (
        !mobileMenuBtn ||
        !mobileMenu
    ) {
        return;
    }


    mobileMenuBtn.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        });

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


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function setupActiveNavigation() {

    const links =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (
        !links.length ||
        !sections.length
    ) {
        return;
    }


    function updateActiveNavigation() {

        let current =
            "home";


        sections.forEach((section) => {

            const top =
                section.offsetTop - 150;


            if (
                window.scrollY >= top
            ) {

                current =
                    section.id;

            }

        });


        links.forEach((link) => {

            const href =
                link.getAttribute(
                    "href"
                );


            link.classList.toggle(
                "active",
                href === "#" + current
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function setupSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

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

        });

}


/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === WEBSITE_KEY
        ) {

            loadWebsiteSettings();

        }


        if (
            event.key === DESIGN_KEY
        ) {

            loadDesignStatus();

        }


        if (
            event.key === AD_KEY
        ) {

            loadAdvertisement();

        }


        if (
            event.key === SYSTEM_KEY
        ) {

            loadWebsiteSettings();

            loadAdvertisement();

            loadBannerStatus();

        }


        if (
            event.key === BANNER_KEY
        ) {

            loadBannerStatus();

        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadWebsiteSettings();

        loadDesignStatus();

        loadAdvertisement();

        loadBannerStatus();

        setupAdvertisementClose();

        setupDesignButtons();

        setupMobileMenu();

        setupNavbarScroll();

        setupActiveNavigation();

        setupSmoothScroll();

    }
);
