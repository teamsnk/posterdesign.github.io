/* =========================================================
ADMIN / SUPER ADMIN AUTH GUARD
FILE: admin/auth-guard.js
========================================================= */

(function () {
"use strict";

```
/* =========================================================
   SESSION KEY
   ========================================================= */

const SESSION_KEY = "chatterAdminSession";


/* =========================================================
   ROLE DEFINITIONS
   ========================================================= */

const ROLES = {
    ADMIN: "admin",
    SUPER_ADMIN: "superadmin"
};


/* =========================================================
   PAGE ACCESS RULES
   ========================================================= */

const PAGE_ACCESS = {
    "dashboard.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ],

    "website.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ],

    "website-edit.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ],

    "design-manage.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ],

    "banner.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ],

    "browser-ui.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ],

    "system.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ],

    "chatter.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ],

    "live-monitor.html": [
        ROLES.SUPER_ADMIN
    ],

    "index.html": [
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ]
};


/* =========================================================
   GET CURRENT SESSION
   ========================================================= */

function getSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);

        if (!raw) {
            return null;
        }

        const session = JSON.parse(raw);

        if (!session || typeof session !== "object") {
            return null;
        }

        return session;

    } catch (error) {
        console.error("Unable to read admin session:", error);
        return null;
    }
}


/* =========================================================
   SAVE SESSION
   ========================================================= */

function saveSession(session) {
    if (!session || typeof session !== "object") {
        return false;
    }

    try {
        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify(session)
        );

        return true;

    } catch (error) {
        console.error("Unable to save admin session:", error);
        return false;
    }
}


/* =========================================================
   CLEAR SESSION
   ========================================================= */

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
}


/* =========================================================
   NORMALIZE ROLE
   ========================================================= */

function normalizeRole(role) {
    if (!role) {
        return null;
    }

    const normalized = String(role)
        .trim()
        .toLowerCase();

    if (normalized === "super admin") {
        return ROLES.SUPER_ADMIN;
    }

    if (normalized === "superadmin") {
        return ROLES.SUPER_ADMIN;
    }

    if (normalized === "admin") {
        return ROLES.ADMIN;
    }

    return null;
}


/* =========================================================
   GET CURRENT ROLE
   ========================================================= */

function getCurrentRole() {
    const session = getSession();

    if (!session) {
        return null;
    }

    return normalizeRole(session.role);
}


/* =========================================================
   IS LOGGED IN
   ========================================================= */

function isLoggedIn() {
    return getSession() !== null;
}


/* =========================================================
   IS ADMIN
   ========================================================= */

function isAdmin() {
    const role = getCurrentRole();

    return (
        role === ROLES.ADMIN ||
        role === ROLES.SUPER_ADMIN
    );
}


/* =========================================================
   IS SUPER ADMIN
   ========================================================= */

function isSuperAdmin() {
    return getCurrentRole() === ROLES.SUPER_ADMIN;
}


/* =========================================================
   CURRENT PAGE
   ========================================================= */

function getCurrentPage() {
    const pathname = window.location.pathname;

    const parts = pathname.split("/");

    return parts[parts.length - 1] || "index.html";
}


/* =========================================================
   ACCESS CHECK
   ========================================================= */

function canAccessPage(pageName) {

    const allowedRoles = PAGE_ACCESS[pageName];

    if (!allowedRoles) {
        return false;
    }

    const currentRole = getCurrentRole();

    if (!currentRole) {
        return false;
    }

    return allowedRoles.includes(currentRole);
}


/* =========================================================
   REDIRECT TO LOGIN
   ========================================================= */

function redirectToLogin() {
    window.location.replace("../login/index.html");
}


/* =========================================================
   ACCESS DENIED PAGE
   ========================================================= */

function showAccessDenied() {

    document.documentElement.innerHTML = `
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >
            <title>Access Denied</title>

            <style>
                * {
                    box-sizing: border-box;
                }

                html,
                body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    min-height: 100%;
                    font-family:
                        Inter,
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                    background: #f5f7fb;
                }

                body {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                }

                .access-card {
                    width: 100%;
                    max-width: 480px;
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 40px 30px;
                    text-align: center;
                    box-shadow:
                        0 20px 60px rgba(15, 23, 42, 0.10);
                    border: 1px solid #e5e7eb;
                }

                .access-icon {
                    width: 72px;
                    height: 72px;
                    margin: 0 auto 20px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fee2e2;
                    color: #dc2626;
                    font-size: 34px;
                }

                h1 {
                    margin: 0 0 12px;
                    color: #111827;
                    font-size: 28px;
                }

                p {
                    margin: 0 auto 26px;
                    color: #6b7280;
                    line-height: 1.7;
                }

                button {
                    border: 0;
                    border-radius: 10px;
                    padding: 13px 22px;
                    background: #635bff;
                    color: #ffffff;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                }

                button:hover {
                    opacity: 0.92;
                }
            </style>
        </head>

        <body>

            <div class="access-card">

                <div class="access-icon">
                    🔒
                </div>

                <h1>
                    Access Denied
                </h1>

                <p>
                    আপনার বর্তমান account-এর এই page
                    access করার permission নেই।
                </p>

                <button
                    type="button"
                    onclick="window.location.href='../login/index.html'"
                >
                    Back to Login
                </button>

            </div>

        </body>
    `;
}


/* =========================================================
   PROTECT CURRENT PAGE
   ========================================================= */

function protectCurrentPage() {

    const session = getSession();

    if (!session) {
        redirectToLogin();
        return false;
    }

    const role = normalizeRole(session.role);

    if (!role) {
        clearSession();
        redirectToLogin();
        return false;
    }

    const currentPage = getCurrentPage();

    if (!canAccessPage(currentPage)) {

        if (currentPage === "live-monitor.html") {
            showAccessDenied();
            return false;
        }

        showAccessDenied();
        return false;
    }

    return true;
}


/* =========================================================
   SUPER ADMIN ONLY
   ========================================================= */

function requireSuperAdmin() {

    if (!isLoggedIn()) {
        redirectToLogin();
        return false;
    }

    if (!isSuperAdmin()) {
        showAccessDenied();
        return false;
    }

    return true;
}


/* =========================================================
   ADMIN OR SUPER ADMIN
   ========================================================= */

function requireAdmin() {

    if (!isLoggedIn()) {
        redirectToLogin();
        return false;
    }

    if (!isAdmin()) {
        showAccessDenied();
        return false;
    }

    return true;
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    clearSession();

    window.location.replace("../login/index.html");
}


/* =========================================================
   SESSION INFORMATION
   ========================================================= */

function getUserInfo() {

    const session = getSession();

    if (!session) {
        return null;
    }

    return {
        email: session.email || "",
        name: session.name || "",
        role: normalizeRole(session.role),
        loginAt: session.loginAt || null
    };
}


/* =========================================================
   DISPLAY ROLE
   ========================================================= */

function getRoleLabel(role) {

    const normalizedRole = normalizeRole(role);

    if (normalizedRole === ROLES.SUPER_ADMIN) {
        return "Super Admin";
    }

    if (normalizedRole === ROLES.ADMIN) {
        return "Admin";
    }

    return "User";
}


/* =========================================================
   AUTO PROTECTION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const page = getCurrentPage();

        /*
         * Do not automatically protect the login page.
         */

        if (
            page === "login.html" ||
            page === ""
        ) {
            return;
        }

        /*
         * Protect only known admin pages.
         */

        if (
            Object.prototype.hasOwnProperty.call(
                PAGE_ACCESS,
                page
            )
        ) {
            protectCurrentPage();
        }
    }
);


/* =========================================================
   PUBLIC API
   ========================================================= */

window.AdminAuth = {

    ROLES,

    getSession,

    saveSession,

    clearSession,

    getCurrentRole,

    getCurrentPage,

    getUserInfo,

    getRoleLabel,

    isLoggedIn,

    isAdmin,

    isSuperAdmin,

    canAccessPage,

    requireAdmin,

    requireSuperAdmin,

    protectCurrentPage,

    logout
};


/* =========================================================
   GLOBAL LOGOUT
   ========================================================= */

window.adminLogout = logout;
```

})();
