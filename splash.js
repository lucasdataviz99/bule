(function () {
    if (sessionStorage.getItem("weddingEntered") === "1") return;

    var WEDDING_DATE = new Date("2026-10-03T16:00:00+02:00");

    var font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap";
    document.head.appendChild(font);

    var splash = document.createElement("div");
    splash.className = "splash";
    splash.setAttribute("role", "button");
    splash.setAttribute("tabindex", "0");
    splash.setAttribute("aria-label", "Compte à rebours — cliquez pour accéder au site");

    splash.innerHTML =
        '<div class="splash-inner">' +
        '  <p class="splash-logo">[ L & L ]</p>' +
        '  <div class="splash-countdown">' +
        '    <div class="splash-unit"><span class="splash-num" data-unit="days">—</span><span class="splash-unit-label">j</span></div>' +
        '    <div class="splash-unit"><span class="splash-num" data-unit="hours">—</span><span class="splash-unit-label">h</span></div>' +
        '    <div class="splash-unit"><span class="splash-num" data-unit="minutes">—</span><span class="splash-unit-label">m</span></div>' +
        '    <div class="splash-unit"><span class="splash-num" data-unit="seconds">—</span><span class="splash-unit-label">s</span></div>' +
        '  </div>' +
        '  <p class="splash-hint">Cliquez pour accéder au site</p>' +
        "</div>";

    document.body.appendChild(splash);
    document.body.classList.add("splash-active");

    var nums = {
        days: splash.querySelector('[data-unit="days"]'),
        hours: splash.querySelector('[data-unit="hours"]'),
        minutes: splash.querySelector('[data-unit="minutes"]'),
        seconds: splash.querySelector('[data-unit="seconds"]')
    };

    function pad(n) {
        return n < 10 ? "0" + n : String(n);
    }

    function updateCountdown() {
        var diff = WEDDING_DATE.getTime() - Date.now();

        if (diff <= 0) {
            nums.days.textContent = "0";
            nums.hours.textContent = "00";
            nums.minutes.textContent = "00";
            nums.seconds.textContent = "00";
            return;
        }

        var s = Math.floor(diff / 1000);
        var days = Math.floor(s / 86400);
        s -= days * 86400;
        var hours = Math.floor(s / 3600);
        s -= hours * 3600;
        var minutes = Math.floor(s / 60);
        var seconds = s - minutes * 60;

        nums.days.textContent = String(days);
        nums.hours.textContent = pad(hours);
        nums.minutes.textContent = pad(minutes);
        nums.seconds.textContent = pad(seconds);
    }

    function closeSplash() {
        sessionStorage.setItem("weddingEntered", "1");
        splash.classList.add("splash--out");
        document.body.classList.remove("splash-active");
        window.setTimeout(function () {
            splash.remove();
        }, 500);
    }

    updateCountdown();
    window.setInterval(updateCountdown, 1000);

    splash.addEventListener("click", closeSplash);
    splash.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            closeSplash();
        }
    });
})();
