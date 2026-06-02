(function () {
    var header = document.querySelector(".header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".navbar");
    if (!header || !toggle || !nav) return;

    function setOpen(open) {
        header.classList.toggle("header--open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
        setOpen(!header.classList.contains("header--open"));
    });

    nav.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            setOpen(false);
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setOpen(false);
    });
})();
