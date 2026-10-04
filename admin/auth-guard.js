/* =========================================================
   ADMIN AUTHENTICATION & ROLE GUARD
   FILE: admin/auth-guard.js
   ========================================================= */

(function () {

    "use strict";

    /* =====================================================
       STORAGE KEY
    ===================================================== */

    const SESSION_KEY = "chatterAdminSession";


    /* =====================================================
       ROLE DEFINITIONS
    ===================================================== */

    const ROLES = {

        ADMIN: "admin",

        SUPER_ADMIN: "superadmin"

    };


    /* =====================================================
       PAGE ACCESS
    ===================================================== */

    const PAGE_ACCESS = {

        "index.html": [
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ],

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

        "link-check.html": [
            ROLES.ADMIN,
            ROLES.SUPER_ADMIN
        ],

        "live-monitor.html": [
            ROLES.SUPER_ADMIN
        ]

    };


    /* =====================================================
       GET SESSION
    ===================================================== */

    function getSession() {

        try {

            const raw =
                localStorage.getItem(
                    SESSION_KEY
                );

            if (!raw) {
                return null;
            }

            const session =
                JSON.parse(raw);

            if (!session) {
                return null;
            }

            return session;

        } catch (error) {

            console.error(
                "Invalid admin session:",
                error
            );

            localStorage.removeItem(
                SESSION_KEY
            );

            return null;
        }

    }


    /* =====================================================
       SAVE SESSION
    ===================================================== */

    function saveSession(session) {

        if (!session) {
            return false;
        }

        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify(session)
        );

        return true;

    }


    /* =====================================================
       CLEAR SESSION
    ===================================================== */

    function clearSession() {

        localStorage.removeItem(
            SESSION_KEY
        );

    }


    /* =====================================================
       IS LOGGED IN
    ===================================================== */

    function isLoggedIn() {

        const session =
            getSession();

        return Boolean(
            session &&
            session.email &&
            session.role
        );

    }


    /* =====================================================
       GET ROLE
    ===================================================== */

    function getRole() {

        const session =
            getSession();

        if (!session) {
            return null;
        }

        return session.role || null;

    }


    /* =====================================================
       IS ADMIN
    ===================================================== */

    function isAdmin() {

        const role =
            getRole();

        return (
            role === ROLES.ADMIN ||
            role === ROLES.SUPER_ADMIN
        );

    }


    /* =====================================================
       IS SUPER ADMIN
    ===================================================== */

    function isSuperAdmin() {

        return (
            getRole() ===
            ROLES.SUPER_ADMIN
        );

    }


    /* =====================================================
       CURRENT PAGE
    ===================================================== */

    function getCurrentPage() {

        const path =
            window.location.pathname;

        const parts =
            path.split("/");

        return (
            parts[parts.length - 1] ||
            "index.html"
        );

    }


    /* =====================================================
       PAGE PERMISSION
    ===================================================== */

    function canAccessPage(
        page,
        role
    ) {

        const allowedRoles =
            PAGE_ACCESS[page];

        /*
         * Unknown pages are allowed here.
         * This prevents the guard from accidentally
         * blocking future public/admin utility pages.
         */

        if (!allowedRoles) {
            return true;
        }

        return allowedRoles.includes(
            role
        );

    }


    /* =====================================================
       ACCESS DENIED
    ===================================================== */

    function showAccessDenied(
        requiredRole
    ) {

        document.documentElement.innerHTML = `

            <html>

            <head>

                <title>
                    Access Denied
                </title>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                >

                <style>

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        margin: 0;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        background: #f5f7fb;
                        font-family:
                            system-ui,
                            -apple-system,
                            BlinkMacSystemFont,
                            "Segoe UI",
                            sans-serif;
                    }

                    .box {
                        width: 100%;
                        max-width: 460px;
                        background: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 20px;
                        padding: 35px;
                        text-align: center;
                        box-shadow:
                            0 20px 50px
                            rgba(0,0,0,.08);
                    }

                    .icon {
                        width: 70px;
                        height: 70px;
                        margin: 0 auto 20px;
                        border-radius: 50%;
                        background: #fef2f2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 30px;
                    }

                    h1 {
                        margin: 0 0 10px;
                        color: #172033;
                        font-size: 24px;
                    }

                    p {
                        margin: 8px 0;
                        color: #718096;
                        line-height: 1.6;
                        font-size: 14px;
                    }

                    .buttons {
                        display: flex;
                        gap: 10px;
                        justify-content: center;
                        flex-wrap: wrap;
                        margin-top: 25px;
                    }

                    button {
                        border: 0;
                        border-radius: 10px;
                        padding: 12px 18px;
                        min-height: 44px;
                        cursor: pointer;
                        font-weight: 700;
                    }

                    .primary {
                        background: #635bff;
                        color: white;
                    }

                    .secondary {
                        background: #f3f4f6;
                        color: #172033;
                    }

                </style>

            </head>

            <body>

                <div class="box">

                    <div class="icon">
                        🔒
                    </div>

                    <h1>
                        Access Denied
                    </h1>

                    <p>
                        আপনার এই page access করার
                        permission নেই।
                    </p>

                    <p>
                        Required role:
                        <strong>
                            ${requiredRole}
                        </strong>
                    </p>

                    <div class="buttons">

                        <button
                            class="primary"
                            onclick="location.href='./dashboard.html'"
                        >
                            Dashboard
                        </button>

                        <button
                            class="secondary"
                            onclick="history.back()"
                        >
                            Go Back
                        </button>

                    </div>

                </div>

            </body>

            </html>
        `;

    }


    /* =====================================================
       REQUIRE ADMIN
    ===================================================== */

    function requireAdmin() {

        const session =
            getSession();

        if (!session) {

            redirectToLogin();

            return false;

        }

        if (!isAdmin()) {

            showAccessDenied(
                "Admin"
            );

            return false;

        }

        return true;

    }


    /* =====================================================
       REQUIRE SUPER ADMIN
    ===================================================== */

    function requireSuperAdmin() {

        const session =
            getSession();

        if (!session) {

            redirectToLogin();

            return false;

        }

        if (!isSuperAdmin()) {

            showAccessDenied(
                "Super Admin"
            );

            return false;

        }

        return true;

    }


    /* =====================================================
       LOGIN REDIRECT
    ===================================================== */

    function redirectToLogin() {

        const current =
            window.location.pathname +
            window.location.search;

        const loginURL =
            "../login/index.html";

        sessionStorage.setItem(
            "adminReturnURL",
            current
        );

        window.location.href =
            loginURL;

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    function logout() {

        clearSession();

        window.location.href =
            "../login/index.html";

    }


    /* =====================================================
       SESSION VALIDATION
    ===================================================== */

    function validateSession() {

        const session =
            getSession();

        if (!session) {
            return false;
        }

        if (!session.email) {
            clearSession();
            return false;
        }

        if (!session.role) {
            clearSession();
            return false;
        }

        if (
            session.role !== ROLES.ADMIN &&
            session.role !== ROLES.SUPER_ADMIN
        ) {

            clearSession();

            return false;

        }

        return true;

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.AdminAuth = {

        ROLES,

        PAGE_ACCESS,

        getSession,

        saveSession,

        clearSession,

        isLoggedIn,

        getRole,

        isAdmin,

        isSuperAdmin,

        getCurrentPage,

        canAccessPage,

        requireAdmin,

        requireSuperAdmin,

        logout,

        validateSession

    };


    /* =====================================================
       AUTO PROTECTION
    ===================================================== */

    const currentPage =
        getCurrentPage();

    const requiredRoles =
        PAGE_ACCESS[currentPage];


    /*
     * Only protect pages explicitly listed
     * in PAGE_ACCESS.
     */

    if (requiredRoles) {

        const session =
            getSession();

        /*
         * No session
         */

        if (!session) {

            redirectToLogin();

        } else {

            const role =
                session.role;

            /*
             * Invalid role
             */

            if (
                !requiredRoles.includes(
                    role
                )
            ) {

                showAccessDenied(
                    requiredRoles.join(
                        " / "
                    )
                );

            }

        }

    }


})();
