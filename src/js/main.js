// navbar
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

// carousel setup
$(".carousel").carousel({ interval: 3500 });
$("video").on("play", function (e) {
    $(".carousel").carousel("pause");
});
$("video").on("stop pause ended", function (e) {
    $(".carousel").carousel();
});

const playBtn = document.querySelector(".play-btn");
const playBtnCircles = document.querySelector(".play-btn-outline");
playBtn.addEventListener("click", () => {
    document.querySelector(".carousel-item.active").childNodes[1].play();
    playBtn.style.visibility = "hidden";
    playBtnCircles.style.visibility = "hidden";
});
// pause carousel when it is about to slide
$(".carousel").on("slide.bs.carousel", function () {
    document.querySelector(".carousel-item.active").childNodes[1].pause();
    playBtn.style.visibility = "visible";
    playBtnCircles.style.visibility = "visible";
});

const videos = document.querySelectorAll("video");
videos.forEach((vid) => {
    vid.removeAttribute("controls");
    vid.addEventListener("ended", (event) => {
        playBtn.style.visibility = "visible";
        playBtnCircles.style.visibility = "visible";
    });
});
