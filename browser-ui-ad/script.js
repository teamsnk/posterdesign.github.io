/* =========================================
   BROWSER UI AD
========================================= */


/* =========================================
   CLOSE AD
========================================= */

const closeAd = document.getElementById("closeAd");

if (closeAd) {

    closeAd.addEventListener("click", function () {

        const wrapper = document.querySelector(".ad-wrapper");

        if (wrapper) {

            wrapper.style.display = "none";

        }

    });

}


/* =========================================
   AD BUTTON
========================================= */

const adButton = document.getElementById("adButton");

if (adButton) {

    adButton.addEventListener("click", function (event) {

        event.preventDefault();

        /*
            এখানে পরে আপনার
            Advertisement Contact Page
            বা WhatsApp / Email link দিতে পারবেন.
        */

        alert("Advertisement contact page coming soon.");

    });

}
