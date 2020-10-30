
const navBtn = document.querySelector(".navbar-icon-bg");
const navIcon = document.querySelector(".navbar-icon");
const navBody = document.querySelector(".navbar-list");
const navItem = document.querySelectorAll(".navbar-item");
navBtn.addEventListener("click", function () {
    if (!navIcon.classList.contains("open")) {
        navIcon.classList.add("open");
        navBody.classList.add("open");
        navItem.forEach((item) => {
            item.classList.add("open");
        });
    } else {
        navIcon.classList.remove("open");
        navBody.classList.remove("open");
        navItem.forEach((item) => {
            item.classList.remove("open");
        });
    }
});


