// navbar
const navBtn = document.querySelector(".navbar-icon-bg");
const navIcon = document.querySelector(".navbar-icon");
const navBody = document.querySelector(".navbar-list");
const navItem = document.querySelectorAll(".navbar-item");
navBtn.addEventListener("click", function () {
    if (!navIcon.classList.contains("open")) {
        navIcon.classList.add("open");
        navBody.classList.add("open");
        navItem.forEach(function (item) {
            item.classList.add("open");
        });
    } else {
        navIcon.classList.remove("open");
        navBody.classList.remove("open");
        navItem.forEach(function (item) {
            item.classList.remove("open");
        });
    }
});
// 
// carousel interval setup
$(".carousel").carousel({
    interval: 4000,
});
// $("video").on("play", function (e) {
//     $(".carousel").carousel("pause");
// });
// $("video").on("stop pause ended", function (e) {
//     $(".carousel").carousel();
// });

// Carousel variables
const playBtn = document.querySelector(".play-btn");
const playBtnCircles = document.querySelector(".play-btn-outline");
// Custom player variables
const customControlsPause = document.querySelector(".custom-controls-pause");
const customControlsStop = document.querySelector(".custom-controls-stop");
const customControlsTimeline = document.querySelector(".custom-controls-timeline");
const customControlsTime = document.querySelector(".custom-controls-timeline-time");
const customControlsLine = document.querySelector(".custom-controls-timeline-line");
const customControlsFwd = document.querySelector(".custom-controls-fwd");
const customControlsBack = document.querySelector(".custom-controls-back");
const customControlsVol = document.querySelector(".custom-controls-vol");
const customControlVolShadow = document.querySelector('.custom-controls-vol-shadow');
const customControlsFull = document.querySelector(".custom-controls-full");
const customControlsBar = document.querySelector(".custom-controls");
// Misc variables
const videos = document.querySelectorAll("video");
let resolution = window.matchMedia('(min-width: 992px)');
// 
// 
// 
// 
// 
//When play btn pressed 
playBtn.addEventListener("click", function () {
    document.querySelector(".carousel-item.active").childNodes[1].play();
    playBtn.style.visibility = "hidden";
    playBtnCircles.style.visibility = "hidden";
    customControlsBar.style.visibility = "visible";
    customControlsPause.children[0].setAttribute("name", "pause-outline");
    $(".carousel").carousel("pause");

    customControlsVolValue(1);

});
// pause carousel when it is about to slide
$(".carousel").on("slide.bs.carousel", function () {
    document.querySelector(".carousel-item.active").childNodes[1].pause();
    if (resolution.matches) {
        playBtn.style.visibility = "visible";
        playBtnCircles.style.visibility = "visible";
    }
    customControlsBar.style.visibility = "hidden";
    $(".carousel").carousel();
});
// 
// 
// 
function checkForCustom() {
    if (resolution.matches) { // If media query matches
        playBtn.style.visibility = "visible";
        playBtnCircles.style.visibility = "visible";
        customControlsBar.style.visibility = "hidden";
        videos.forEach(function (vid) {
            vid.removeAttribute("controls");
            vid.addEventListener("timeupdate", setTime);
            vid.addEventListener("ended", videoEnded);
            vid.addEventListener("fullscreenchange", outOfFullscreen);
        });
    } else {
        playBtn.style.visibility = "hidden";
        playBtnCircles.style.visibility = "hidden";
        videos.forEach(function (vid) {
            vid.setAttribute("controls", '');
            vid.removeEventListener("timeupdate", setTime);
            vid.removeEventListener("ended", videoEnded);
            vid.removeEventListener("fullscreenchange", outOfFullscreen);
        });
    }
}
checkForCustom();
window.addEventListener('resize', checkForCustom);
// 
// 
//Custom player events and functions 
function videoEnded() {
    playBtn.style.visibility = "visible";
    playBtnCircles.style.visibility = "visible";
    customControlsBar.style.visibility = "hidden";
    $(".carousel").carousel();
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function outOfFullscreen() {
    if (!document.fullscreenElement) {
        playBtn.style.visibility = "hidden";
        playBtnCircles.style.visibility = "hidden";
        customControlsBar.style.visibility = "visible";
        document.querySelector(".carousel").scrollIntoView(); //Scroll to particular place
    }
}
//Play/Pause
customControlsPause.addEventListener("click", function () {
    if (document.querySelector(".carousel-item.active").childNodes[1].paused) {
        customControlsPause.children[0].setAttribute("name", "pause-outline");
        document.querySelector(".carousel-item.active").childNodes[1].play();
    } else {
        customControlsPause.children[0].setAttribute(
            "name",
            "caret-forward-sharp"
        );
        document.querySelector(".carousel-item.active").childNodes[1].pause();
    }
});
// STOP
customControlsStop.addEventListener("click", stopVideo);

function stopVideo() {
    document.querySelector(".carousel-item.active").childNodes[1].pause();
    document.querySelector(
        ".carousel-item.active"
    ).childNodes[1].currentTime = 0;
    playBtn.style.visibility = "visible";
    playBtnCircles.style.visibility = "visible";
    customControlsBar.style.visibility = "hidden";
}

// rewind
customControlsBack.addEventListener("click", rewindVideo);

function fwdVideo() {
    if (
        document.querySelector(".carousel-item.active").childNodes[1]
        .currentTime +
        5 <=
        document.querySelector(".carousel-item.active").childNodes[1].duration
    ) {
        document.querySelector(
                ".carousel-item.active"
            ).childNodes[1].currentTime =
            document.querySelector(".carousel-item.active").childNodes[1]
            .currentTime + 5;
    } else {
        stopVideo();
    }
}
//  forward
customControlsFwd.addEventListener("click", fwdVideo);

function rewindVideo() {
    if (
        document.querySelector(".carousel-item.active").childNodes[1]
        .currentTime +
        5 >
        0
    ) {
        document.querySelector(
                ".carousel-item.active"
            ).childNodes[1].currentTime =
            document.querySelector(".carousel-item.active").childNodes[1]
            .currentTime - 5;
    } else {
        document.querySelector(
            ".carousel-item.active"
        ).childNodes[1].currentTime = 0;
    }
}

// fullscreen
customControlsFull.addEventListener("click", toggleFullScreen);

function toggleFullScreen() {
    if (!document.querySelector(".carousel-item.active").childNodes[1].fullscreenElement) {
        document.querySelector(".carousel-item.active").childNodes[1].requestFullscreen();

    } else {
        if (document.querySelector(".carousel-item.active").childNodes[1].exitFullscreen) {

            document.querySelector(".carousel-item.active").childNodes[1].exitFullscreen();
        }
    }
}

// Timeline
function setTime() {
    let hours = Math.floor(document.querySelector(".carousel-item.active").childNodes[1].currentTime / 3600);
    let minutes = Math.floor(document.querySelector(".carousel-item.active").childNodes[1].currentTime / 60 - hours * 60);
    let seconds = Math.floor((document.querySelector(".carousel-item.active").childNodes[1].currentTime % 3600) - minutes * 60);
    let hoursValue;
    let minuteValue;
    let secondValue;

    if (hours < 10) {
        hoursValue = "0" + hours;
    } else {
        hoursValue = hours;
    }

    if (minutes < 10) {
        minuteValue = "0" + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = "0" + seconds;
    } else {
        secondValue = seconds;
    }

    // let mediaTime = hoursValue + ":" + minuteValue + ":" + secondValue;
    let mediaTime = minuteValue + ":" + secondValue;
    customControlsTime.textContent = mediaTime;

    let barLength =
        customControlsTimeline.clientWidth * (document.querySelector(".carousel-item.active").childNodes[1].currentTime / document.querySelector(".carousel-item.active").childNodes[1].duration);

    customControlsLine.style.width = barLength + "px";
}
// pointer mouse over timeline
customControlsTimeline.addEventListener("mouseover", function (e) {
    customControlsTimeline.style.cursor = "pointer";
});
// click on timeline
customControlsTimeline.onclick = function (e) {
    let rect = customControlsTimeline.getBoundingClientRect();
    // ab is position of mouse click relative to rect
    let ab = Math.ceil(e.x - rect.left) < 1 ? 1 : Math.ceil(e.x - rect.left);
    // percentage to multiply the time
    let perc = ab / customControlsTimeline.offsetWidth;
    document.querySelector(".carousel-item.active").childNodes[1].currentTime = document.querySelector(".carousel-item.active").childNodes[1].duration * perc;
};
// set value of volume bar
const customControlsVolValue = function (val) {
    document.querySelector("#custom-controls-vol-bar").value = val;
}
// Changing volume and icon when bar is toggled
document.querySelector("#custom-controls-vol-bar").addEventListener('input', function () {
    document.querySelector(".carousel-item.active").childNodes[1].volume = document.querySelector("#custom-controls-vol-bar").value;
    if (document.querySelector("#custom-controls-vol-bar").value >= 0.5 && document.querySelector("#custom-controls-vol-bar").value < 0.75) {
        customControlsVol.children[1].setAttribute(
            "name",
            "volume-medium-outline"
        );
    } else if (document.querySelector("#custom-controls-vol-bar").value >= 0.75) {
        customControlsVol.children[1].setAttribute(
            "name",
            "volume-high-outline"
        );
    } else if (document.querySelector("#custom-controls-vol-bar").value >= 0.2 && document.querySelector("#custom-controls-vol-bar").value < 0.5) {
        customControlsVol.children[1].setAttribute(
            "name",
            "volume-low-outline"
        );
    } else if (document.querySelector("#custom-controls-vol-bar").value > 0 && document.querySelector("#custom-controls-vol-bar").value < 0.2) {
        customControlsVol.children[1].setAttribute(
            "name",
            "volume-off-outline"
        );
    } else if (document.querySelector("#custom-controls-vol-bar").value == 0) {
        customControlsVol.children[1].setAttribute(
            "name",
            "volume-mute-outline"
        );
    }
})
// document.querySelector("#custom-controls-vol-bar").value

// Mute button
customControlVolShadow.addEventListener('click', function () {
    document.querySelector(".carousel-item.active").childNodes[1].volume = 0;
    document.querySelector("#custom-controls-vol-bar").value = 0;
    customControlsVol.children[1].setAttribute(
        "name",
        "volume-mute-outline"
    );
})
// 
// 
// 
// 
// 
// 
// 
// fetching items
let products;
const sixthSection = document.querySelector('.sixth-wrapper');
fetch('items.json').then(function (response) {
    if (response.ok) {
        response.json().then(function (json) {
            createItems(json);
        });
    } else {
        console.log(
            "Network request for products.json failed with response " +
            response.status +
            ": " +
            response.statusText
        );
    }
});

function createItems(objects) {
    for (object of objects) {
        let outerWrapper = document.createElement('div');
        let itemWrapper = document.createElement('div');
        let imageWrapper = document.createElement('div');
        let textWrapper = document.createElement('div');
        imageWrapper.classList.add('sixth-item-image-wrapper');
        textWrapper.classList.add('sixth-item-text-wrapper');
        outerWrapper.classList.add('col-md-4');
        itemWrapper.classList.add('sixth-item', 'col-md-12');
        let itemName = document.createElement('h5');
        let itemPrice = document.createElement('h4');
        let itemImage = document.createElement('img');
        let itemButton = document.createElement('button');
        if (object.isNew) {
            let itemNew = document.createElement('span');
            itemWrapper.appendChild(itemNew);
            itemNew.textContent = 'NEW';
        }
        imageWrapper.appendChild(itemImage);
        textWrapper.appendChild(itemName);
        textWrapper.appendChild(itemPrice);
        textWrapper.appendChild(itemButton);

        itemName.textContent = object.name;
        itemPrice.textContent = object.price + '$';
        itemImage.src = './dist/img/' + object.imagePath;
        itemButton.textContent = 'ADD TO CART';
        itemWrapper.appendChild(imageWrapper);
        itemWrapper.appendChild(textWrapper);
        outerWrapper.appendChild(itemWrapper);
        sixthSection.appendChild(outerWrapper);
    }

}
// Second slider (slickSlider)
$(document).ready(function () {
    $('.mySlickSlider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 4000,
        // arrows: false
        prevArrow: '<button class="slick-prev"><ion-icon name="arrow-back-outline"></ion-icon></button>',
        nextArrow: '<button class="slick-next"><ion-icon name="arrow-forward-outline"></ion-icon></button>',
    });
});
