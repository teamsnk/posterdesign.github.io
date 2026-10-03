/* =========================================================
   DOCTOR POSTER MAKER
   HOMEPAGE JAVASCRIPT
========================================================= */


/* =========================================================
   LOCAL STORAGE KEYS
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
   DEFAULT ADVERTISEMENT
========================================================= */

const defaultAdvertisement = {

    enabled: true,

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
   DEFAULT SYSTEM
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
   DEFAULT BANNERS
========================================================= */

const defaultBannerStatus = {

    banner1: true,

    banner2: true

};


/* =========================================================
   SAFE LOCAL STORAGE READER
========================================================= */

function readJSON(
    key,
    fallback
) {

    try {

        const saved =
            localStorage.getItem(key);


        if (!saved) {

            return {
                ...fallback
            };

        }


        const parsed =
            JSON.parse(saved);


        return {

            ...fallback,

            ...parsed

        };

    } catch (error) {

        console.error(
            "Unable to read:",
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
        readJSON(
            WEBSITE_KEY,
            defaultWebsiteSettings
        );


    const websiteName =
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



    if (websiteName) {

        websiteName.textContent =
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
                "mailto:" +
                settings.contactEmail;

        } else {

            footerContactEmail.textContent =
                "Contact Us";

            footerContactEmail.href =
                "#";

        }

    }


    applyWebsiteStatus(
        settings
    );

}


/* =========================================================
   WEBSITE STATUS
========================================================= */

function applyWebsiteStatus(
    settings
) {

    const websiteContent =
        document.getElementById(
            "websiteContent"
        );


    const websiteOffline =
        document.getElementById(
            "websiteOffline"
        );


    const offlineIcon =
        document.getElementById(
            "offlineIcon"
        );


    const offlineTitle =
        document.getElementById(
            "offlineTitle"
        );


    const offlineDescription =
        document.getElementById(
            "offlineDescription"
        );


    if (
        !websiteContent ||
        !websiteOffline
    ) {

        return;

    }


    const system =
        readJSON(
            SYSTEM_KEY,
            defaultSystemSettings
        );



    /* =====================================================
       WEBSITE STATUS OFF
    ===================================================== */

    if (
        system.websiteStatus === false ||
        settings.websiteEnabled === false
    ) {

        websiteContent.style.display =
            "none";

        websiteOffline.style.display =
            "flex";


        if (offlineIcon) {

            offlineIcon.textContent =
                "⚙";

        }


        if (offlineTitle) {

            offlineTitle.textContent =
                "Website Temporarily Unavailable";

        }


        if (offlineDescription) {

            offlineDescription.textContent =
                "We are currently updating the website. Please check back again soon.";

        }


        document.title =
            "Website Temporarily Unavailable";


        return;

    }



    /* =====================================================
       MAINTENANCE MODE
    ===================================================== */

    if (
        system.maintenanceMode === true
    ) {

        websiteContent.style.display =
            "none";

        websiteOffline.style.display =
            "flex";


        if (offlineIcon) {

            offlineIcon.textContent =
                "🔧";

        }


        if (offlineTitle) {

            offlineTitle.textContent =
                "Website Under Maintenance";

        }


        if (offlineDescription) {

            offlineDescription.textContent =
                "We are currently performing maintenance. Please check back again soon.";

        }


        document.title =
            "Website Under Maintenance";


        return;

    }



    /* =====================================================
       WEBSITE NORMAL
    ===================================================== */

    websiteContent.style.display =
        "";

    websiteOffline.style.display =
        "none";


    document.title =
        settings.websiteName ||
        "Doctor Poster Maker";

}


/* =========================================================
   DESIGN MANAGEMENT
========================================================= */

function loadDesignStatus() {

    const status =
        readJSON(
            DESIGN_KEY,
            defaultDesignStatus
        );


    const designCards =
        document.querySelectorAll(
            "[data-design-card]"
        );


    let activeCount = 0;


    designCards.forEach(
        function (card) {

            const design =
                card.dataset.designCard;


            const active =
                status[design] !== false;


            const button =
                card.querySelector(
                    "[data-design]"
                );


            if (active) {

                activeCount++;

                card.style.display =
                    "";

                card.classList.remove(
                    "inactive-card"
                );


                if (button) {

                    button.disabled =
                        false;

                    button.style.pointerEvents =
                        "";

                    button.style.opacity =
                        "";

                    button.textContent =
                        button.dataset.originalText ||
                        "Use Design →";

                }

            } else {

                card.style.display =
                    "none";

            }

        }
    );



    const designCountStat =
        document.getElementById(
            "designCountStat"
        );


    if (designCountStat) {

        designCountStat.textContent =
            activeCount;

    }



    const noDesignMessage =
        document.getElementById(
            "noDesignMessage"
        );


    if (noDesignMessage) {

        noDesignMessage.style.display =
            activeCount === 0
                ? "block"
                : "none";

    }

}


/* =========================================================
   OPEN DESIGN
========================================================= */

function openDesign(
    design
) {

    const designs =
        readJSON(
            DESIGN_KEY,
            defaultDesignStatus
        );


    if (
        designs[design] === false
    ) {

        alert(
            "This design is currently unavailable."
        );

        return;

    }


    const system =
        readJSON(
            SYSTEM_KEY,
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


    const designMap = {

        design1:
            "design1/index.html",

        design2:
            "design2/index.html",

        design3:
            "design3/index.html",

        design4:
            "design4/index.html"

    };


    if (
        designMap[design]
    ) {

        window.location.href =
            designMap[design];

    }

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
        function (button) {

            if (
                button.dataset.originalText ===
                undefined
            ) {

                button.dataset.originalText =
                    button.textContent.trim();

            }


            button.addEventListener(
                "click",
                function () {

                    openDesign(
                        button.dataset.design
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
                "open"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mobileMenu.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !mobileMenu.contains(
                    event.target
                ) &&
                !menuButton.contains(
                    event.target
                )
            ) {

                mobileMenu.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function setupNavbar() {

    const navbar =
        document.getElementById(
            "navbar"
        );


    if (!navbar) {

        return;

    }


    function updateNavbar() {

        if (
            window.scrollY > 15
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


    function updateActiveNav() {

        let current =
            "home";


        sections.forEach(
            function (section) {

                const top =
                    section.offsetTop - 150;


                if (
                    window.scrollY >=
                    top
                ) {

                    current =
                        section.id;

                }

            }
        );


        links.forEach(
            function (link) {

                const href =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(
                    "active",
                    href ===
                    "#" + current
                );

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function setupSmoothScroll() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute(
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
   ADVERTISEMENT SYSTEM
========================================================= */

function loadAdvertisement() {

    const ad =
        readJSON(
            AD_KEY,
            defaultAdvertisement
        );


    const system =
        readJSON(
            SYSTEM_KEY,
            defaultSystemSettings
        );


    const banner =
        document.getElementById(
            "topAdBanner"
        );


    if (!banner) {

        return;

    }



    /*
     * Advertisement System OFF
     */

    if (
        system.advertisementSystem ===
        false
    ) {

        banner.style.display =
            "none";

        return;

    }



    /*
     * Advertisement itself OFF
     */

    if (
        ad.enabled === false
    ) {

        banner.style.display =
            "none";

        return;

    }



    banner.style.display =
        "";


    banner.style.background =
        ad.backgroundColor ||
        defaultAdvertisement.backgroundColor;



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

        adButton.style.color =
            ad.buttonColor ||
            "#087f86";

    }



    /*
     * Advertisement Image
     */

    if (
        ad.image
    ) {

        if (adImage) {

            adImage.src =
                ad.image;

        }


        if (adImageWrap) {

            adImageWrap.style.display =
                "block";

        }


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
     * Close Button
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


    const banner =
        document.getElementById(
            "topAdBanner"
        );


    if (
        !adClose ||
        !banner
    ) {

        return;

    }


    adClose.addEventListener(
        "click",
        function () {

            banner.style.display =
                "none";

        }
    );

}


/* =========================================================
   BANNER MANAGEMENT
   BANNER 1 + BANNER 2
========================================================= */

function loadBannerStatus() {

    const banners =
        readJSON(
            BANNER_KEY,
            defaultBannerStatus
        );


    const banner1 =
        document.getElementById(
            "homepageBanner1"
        );


    const banner2 =
        document.getElementById(
            "homepageBanner2"
        );


    const bannerArea =
        document.getElementById(
            "homepageBannerArea"
        );



    if (banner1) {

        banner1.style.display =
            banners.banner1 === false
                ? "none"
                : "";

    }


    if (banner2) {

        banner2.style.display =
            banners.banner2 === false
                ? "none"
                : "";

    }



    if (bannerArea) {

        const activeBannerExists =
            banners.banner1 !== false ||
            banners.banner2 !== false;


        bannerArea.style.display =
            activeBannerExists
                ? ""
                : "none";

    }

}


/* =========================================================
   SYSTEM → BANNER CONNECTION
========================================================= */

function applySystemBannerControl() {

    const system =
        readJSON(
            SYSTEM_KEY,
            defaultSystemSettings
        );


    const bannerArea =
        document.getElementById(
            "homepageBannerArea"
        );


    if (!bannerArea) {

        return;

    }


    /*
     * Advertisement System controls
     * Banner Management system.
     */

    if (
        system.advertisementSystem ===
        false
    ) {

        bannerArea.style.display =
            "none";

        return;

    }


    loadBannerStatus();

}


/* =========================================================
   SYSTEM → POSTER CREATION
========================================================= */

function applyPosterCreationStatus() {

    const system =
        readJSON(
            SYSTEM_KEY,
            defaultSystemSettings
        );


    const enabled =
        system.posterCreation !== false;


    const buttons =
        document.querySelectorAll(
            '[data-design], #primaryButton, #secondaryButton, #ctaCreateButton'
        );


    buttons.forEach(
        function (button) {

            if (
                !button.dataset.originalText
            ) {

                button.dataset.originalText =
                    button.textContent.trim();

            }


            if (enabled) {

                button.classList.remove(
                    "poster-creation-disabled"
                );


                button.removeAttribute(
                    "aria-disabled"
                );


                button.style.opacity =
                    "";


                button.textContent =
                    button.dataset.originalText;

            } else {

                button.classList.add(
                    "poster-creation-disabled"
                );


                button.setAttribute(
                    "aria-disabled",
                    "true"
                );


                button.style.opacity =
                    ".55";


                button.textContent =
                    "Creation Disabled";

            }

        }
    );

}


/* =========================================================
   SYSTEM SETTINGS SYNC
========================================================= */

function loadSystemSettings() {

    loadWebsiteSettings();

    loadAdvertisement();

    loadBannerStatus();

    applySystemBannerControl();

    applyPosterCreationStatus();

}


/* =========================================================
   STORAGE EVENT
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
            event.key === BANNER_KEY
        ) {

            loadBannerStatus();

        }


        if (
            event.key === SYSTEM_KEY
        ) {

            loadSystemSettings();

        }

    }
);


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        loadWebsiteSettings();


        loadDesignStatus();


        setupDesignButtons();


        setupMobileMenu();


        setupNavbar();


        setupActiveNavigation();


        setupSmoothScroll();


        loadAdvertisement();


        setupAdvertisementClose();


        loadBannerStatus();


        applySystemBannerControl();


        applyPosterCreationStatus();

    }
);
