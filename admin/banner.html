/* =========================================================
   DOCTOR POSTER MAKER
   HOMEPAGE SCRIPT
========================================================= */


/* =========================================================
   STORAGE KEYS
========================================================= */

const WEBSITE_KEY = "doctorPosterWebsiteSettings";
const DESIGN_KEY = "doctorPosterDesignStatus";
const AD_KEY = "doctorPosterAdvertisement";
const SYSTEM_KEY = "doctorPosterSystemSettings";

const BANNER_KEY = "doctorPosterBannerStatus";
const BANNER_CONTENT_KEY = "doctorPosterBanners";


/* =========================================================
   DEFAULT WEBSITE SETTINGS
========================================================= */

const defaultWebsiteSettings = {

    websiteName: "Doctor Poster Maker",

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

    websiteStatus: true,

    maintenanceMode: false,

    posterCreation: true,

    advertisementSystem: true

};


/* =========================================================
   DEFAULT BANNER STATUS
========================================================= */

const defaultBannerStatus = {

    banner1: true,
    banner2: true

};


/* =========================================================
   DEFAULT BANNER CONTENT
========================================================= */

const defaultBanners = {

    banner1: {

        label:
            "Healthcare Promotion",

        title:
            "Professional Healthcare Promotion",

        description:
            "Promote your healthcare service, clinic or brand.",

        buttonText:
            "Learn More →",

        buttonLink:
            "#",

        image:
            ""

    },


    banner2: {

        label:
            "Healthcare Service",

        title:
            "Grow Your Healthcare Brand",

        description:
            "Reach doctors, clinics and healthcare professionals.",

        buttonText:
            "Get Started →",

        buttonLink:
            "#",

        image:
            ""

    }

};


/* =========================================================
   SAFE JSON READER
========================================================= */

function readJSON(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);

        if (!value) {

            return fallback;

        }

        const parsed =
            JSON.parse(value);

        if (
            !parsed ||
            typeof parsed !== "object"
        ) {

            return fallback;

        }

        return parsed;

    } catch (error) {

        console.error(
            "LocalStorage read error:",
            error
        );

        return fallback;

    }

}


/* =========================================================
   GET SYSTEM SETTINGS
========================================================= */

function getSystemSettings() {

    const saved =
        readJSON(
            SYSTEM_KEY,
            {}
        );

    return {

        ...defaultSystemSettings,
        ...saved

    };

}


/* =========================================================
   LOAD WEBSITE SETTINGS
========================================================= */

function loadWebsiteSettings() {

    const saved =
        readJSON(
            WEBSITE_KEY,
            {}
        );

    const settings = {

        ...defaultWebsiteSettings,
        ...saved

    };


    /* Website Name */

    const navWebsiteName =
        document.getElementById(
            "navWebsiteName"
        );

    if (navWebsiteName) {

        navWebsiteName.textContent =
            settings.websiteName;

    }


    const footerWebsiteName =
        document.getElementById(
            "footerWebsiteName"
        );

    if (footerWebsiteName) {

        footerWebsiteName.textContent =
            settings.websiteName;

    }


    /* Tagline */

    const navTagline =
        document.getElementById(
            "navTagline"
        );

    if (navTagline) {

        navTagline.textContent =
            settings.websiteTagline;

    }


    /* Hero */

    const heroBadge =
        document.getElementById(
            "heroBadge"
        );

    if (heroBadge) {

        heroBadge.textContent =
            settings.heroBadge;

    }


    const heroTitle =
        document.getElementById(
            "heroTitle"
        );

    if (heroTitle) {

        heroTitle.textContent =
            settings.heroTitle;

    }


    const heroDescription =
        document.getElementById(
            "heroDescription"
        );

    if (heroDescription) {

        heroDescription.textContent =
            settings.heroDescription;

    }


    /* Buttons */

    const primaryButton =
        document.getElementById(
            "primaryButton"
        );

    if (primaryButton) {

        primaryButton.textContent =
            settings.primaryButton;

    }


    const secondaryButton =
        document.getElementById(
            "secondaryButton"
        );

    if (secondaryButton) {

        secondaryButton.textContent =
            settings.secondaryButton;

    }


    const ctaCreateButton =
        document.getElementById(
            "ctaCreateButton"
        );

    if (ctaCreateButton) {

        ctaCreateButton.textContent =
            settings.primaryButton;

    }


    /* Stats */

    const stat1 =
        document.getElementById(
            "stat1"
        );

    if (stat1) {

        stat1.textContent =
            settings.stat1;

    }


    const stat2 =
        document.getElementById(
            "stat2"
        );

    if (stat2) {

        stat2.textContent =
            settings.stat2;

    }


    /* Footer */

    const footerDescription =
        document.getElementById(
            "footerDescription"
        );

    if (footerDescription) {

        footerDescription.textContent =
            settings.footerDescription;

    }


    const copyrightText =
        document.getElementById(
            "copyrightText"
        );

    if (copyrightText) {

        copyrightText.textContent =
            settings.copyrightText;

    }


    const footerContactEmail =
        document.getElementById(
            "footerContactEmail"
        );

    if (footerContactEmail) {

        if (settings.contactEmail) {

            footerContactEmail.textContent =
                settings.contactEmail;

            footerContactEmail.href =
                `mailto:${settings.contactEmail}`;

            footerContactEmail.style.display =
                "";

        } else {

            footerContactEmail.style.display =
                "none";

        }

    }


    /* Page Title */

    document.title =
        settings.websiteName;


    /* Website Status */

    applyWebsiteStatus(
        settings.websiteEnabled !== false
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


    if (!websiteContent) {
        return;
    }


    if (enabled === false) {

        websiteContent.style.display =
            "none";

        if (websiteOffline) {

            websiteOffline.style.display =
                "flex";

        }

    } else {

        websiteContent.style.display =
            "";

        if (websiteOffline) {

            websiteOffline.style.display =
                "none";

        }

    }

}


/* =========================================================
   LOAD DESIGN STATUS
========================================================= */

function loadDesignStatus() {

    const saved =
        readJSON(
            DESIGN_KEY,
            {}
        );

    const designs = {

        ...defaultDesignStatus,
        ...saved

    };


    const cards =
        document.querySelectorAll(
            "[data-design-card]"
        );


    let activeCount = 0;


    cards.forEach(card => {

        const design =
            card.dataset.designCard;

        const active =
            designs[design] !== false;


        if (active) {

            activeCount++;

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });


    const designCountStat =
        document.getElementById(
            "designCountStat"
        );

    if (designCountStat) {

        designCountStat.textContent =
            `${activeCount} Designs`;

    }


    const noDesignMessage =
        document.getElementById(
            "noDesignMessage"
        );


    if (noDesignMessage) {

        if (activeCount === 0) {

            noDesignMessage.style.display =
                "block";

        } else {

            noDesignMessage.style.display =
                "none";

        }

    }

}


/* =========================================================
   GET BANNER STATUS
========================================================= */

function getBannerStatus() {

    const saved =
        readJSON(
            BANNER_KEY,
            {}
        );

    return {

        ...defaultBannerStatus,
        ...saved

    };

}


/* =========================================================
   GET BANNER CONTENT
========================================================= */

function getBannerContent() {

    const saved =
        readJSON(
            BANNER_CONTENT_KEY,
            {}
        );

    return {

        banner1: {

            ...defaultBanners.banner1,

            ...(saved.banner1 || {})

        },

        banner2: {

            ...defaultBanners.banner2,

            ...(saved.banner2 || {})

        }

    };

}


/* =========================================================
   LOAD HOMEPAGE BANNERS
========================================================= */

function loadBannerStatus() {

    const bannerArea =
        document.getElementById(
            "homepageBannerArea"
        );


    if (!bannerArea) {

        return;

    }


    const system =
        getSystemSettings();


    /*
       Advertisement System OFF
       = Entire homepage banner system OFF
    */

    if (
        system.advertisementSystem === false
    ) {

        bannerArea.style.display =
            "none";

        return;

    }


    const status =
        getBannerStatus();

    const banners =
        getBannerContent();


    let visibleCount = 0;


    ["banner1", "banner2"].forEach(id => {

        const banner =
            document.querySelector(
                `[data-banner-slot="${id}"]`
            );


        if (!banner) {
            return;
        }


        const enabled =
            status[id] !== false;


        if (!enabled) {

            banner.style.display =
                "none";

            return;

        }


        visibleCount++;

        banner.style.display =
            "";


        applyBannerContent(
            banner,
            banners[id]
        );

    });


    if (visibleCount === 0) {

        bannerArea.style.display =
            "none";

    } else {

        bannerArea.style.display =
            "";

    }

}


/* =========================================================
   APPLY BANNER CONTENT
========================================================= */

function applyBannerContent(
    bannerElement,
    data
) {

    const label =
        bannerElement.querySelector(
            ".homepage-banner-label"
        );

    const title =
        bannerElement.querySelector(
            ".homepage-banner-title"
        );

    const text =
        bannerElement.querySelector(
            ".homepage-banner-text"
        );

    const button =
        bannerElement.querySelector(
            ".homepage-banner-button"
        );

    const image =
        bannerElement.querySelector(
            ".homepage-banner-image"
        );

    const placeholder =
        bannerElement.querySelector(
            ".homepage-banner-placeholder"
        );


    if (label) {

        label.textContent =
            data.label || "";

    }


    if (title) {

        title.textContent =
            data.title || "";

    }


    if (text) {

        text.textContent =
            data.description || "";

    }


    if (button) {

        button.textContent =
            data.buttonText || "";

        button.href =
            data.buttonLink || "#";

        button.target =
            "_blank";

        button.rel =
            "noopener noreferrer";

    }


    if (image) {

        if (data.image) {

            image.src =
                data.image;

            image.style.display =
                "block";

        } else {

            image.removeAttribute(
                "src"
            );

            image.style.display =
                "none";

        }

    }


    if (placeholder) {

        if (data.image) {

            placeholder.style.display =
                "none";

        } else {

            placeholder.style.display =
                "";

        }

    }

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
        `${design}/index.html`;

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenuBtn"
        );

    const menu =
        document.getElementById(
            "mobileMenu"
        );


    if (!button || !menu) {

        return;

    }


    button.addEventListener(
        "click",
        function() {

            menu.classList.toggle(
                "active"
            );

        }
    );


    menu.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function() {

                    menu.classList.remove(
                        "active"
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
            ".nav-link"
        );


    if (!links.length) {
        return;
    }


    links.forEach(link => {

        link.addEventListener(
            "click",
            function() {

                links.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                this.classList.add(
                    "active"
                );

            }
        );

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function setupSmoothScroll() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

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
   LOAD BROWSER UI ADVERTISEMENT
========================================================= */

function loadAdvertisement() {

    const adBanner =
        document.getElementById(
            "topAdBanner"
        );


    if (!adBanner) {
        return;
    }


    const system =
        getSystemSettings();


    /*
       System Advertisement OFF
    */

    if (
        system.advertisementSystem === false
    ) {

        adBanner.style.display =
            "none";

        return;

    }


    const saved =
        readJSON(
            AD_KEY,
            {}
        );


    const ad = {

        ...defaultAdvertisement,
        ...saved

    };


    /*
       Advertisement itself OFF
    */

    if (
        ad.enabled === false
    ) {

        adBanner.style.display =
            "none";

        return;

    }


    adBanner.style.display =
        "";


    /* Background */

    if (ad.backgroundColor) {

        adBanner.style.background =
            ad.backgroundColor;

    }


    /* Label */

    const label =
        document.getElementById(
            "adLabel"
        );

    if (label) {

        label.textContent =
            ad.label;

    }


    /* Title */

    const title =
        document.getElementById(
            "adTitle"
        );

    if (title) {

        title.textContent =
            ad.title;

    }


    /* Description */

    const description =
        document.getElementById(
            "adDescription"
        );

    if (description) {

        description.textContent =
            ad.description;

    }


    /* Button */

    const button =
        document.getElementById(
            "adButton"
        );

    if (button) {

        button.textContent =
            ad.buttonText;

        button.href =
            ad.buttonLink || "#";

    }


    /* Button Color */

    if (
        button &&
        ad.buttonColor
    ) {

        button.style.background =
            ad.buttonColor;

    }


    /* Image */

    const image =
        document.getElementById(
            "adImage"
        );

    const imageWrap =
        document.getElementById(
            "adImageWrap"
        );

    const icon =
        document.getElementById(
            "adIcon"
        );


    if (
        image &&
        ad.image
    ) {

        image.src =
            ad.image;

        image.style.display =
            "block";


        if (imageWrap) {

            imageWrap.style.display =
                "";

        }


        if (icon) {

            icon.style.display =
                "none";

        }

    } else {

        if (image) {

            image.removeAttribute(
                "src"
            );

            image.style.display =
                "none";

        }


        if (imageWrap) {

            imageWrap.style.display =
                "none";

        }


        if (icon) {

            icon.style.display =
                "";

        }

    }


    /* Close Button */

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
                "";

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


    const adBanner =
        document.getElementById(
            "topAdBanner"
        );


    if (
        !closeButton ||
        !adBanner
    ) {

        return;

    }


    closeButton.addEventListener(
        "click",
        function() {

            adBanner.style.display =
                "none";

        }
    );

}


/* =========================================================
   STORAGE EVENT
========================================================= */

window.addEventListener(
    "storage",
    function(event) {


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
            event.key === BANNER_KEY ||
            event.key === BANNER_CONTENT_KEY
        ) {

            loadBannerStatus();

        }


        if (
            event.key === SYSTEM_KEY
        ) {

            loadWebsiteSettings();

            loadAdvertisement();

            loadBannerStatus();

        }

    }
);


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadWebsiteSettings();

        loadDesignStatus();

        loadAdvertisement();

        loadBannerStatus();

        setupAdvertisementClose();

        setupMobileMenu();

        setupNavbarScroll();

        setupActiveNavigation();

        setupSmoothScroll();

    }
);
