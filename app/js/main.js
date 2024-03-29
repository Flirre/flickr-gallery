let photos = 0;
let slide = 0;
let moving = true;
let half = true;
let galleryPhotos;

document.addEventListener("DOMContentLoaded", function() {
  fetch(
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=0d8c0f6a218bd0f4408bda4965712e2e&tags=sportscar&safe_search=1&content_type=1&media=photos&extras=url_o&per_page=25;"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let jsonPhotos = json.photos.photo;
      for (let i = 0; i < jsonPhotos.length; i++) {
        if (jsonPhotos[i] && jsonPhotos[i].url_o) {
          appendPhoto(jsonPhotos[i].url_o);
        }
      }
    })
    .then(function() {
      galleryPhotos = document.getElementsByClassName("carousel-photo");
    })
    .then(function() {
      initCarousel();
      initTouch();
    });
});

function appendPhoto(url) {
  const gallery = document.getElementById("gallery");
  const imageElem = document.createElement("span");
  const imageSrc = document.createElement("img");
  const downloadImage = new Image();
  downloadImage.onload = function() {
    // set visible image to be downloaded image.
    imageSrc.setAttribute("src", url);
  };
  downloadImage.onerror = function() {
    // if image download fails, set error.png to be visible.
    imageElem.style.background = "url(../assets/error.png) 50% no-repeat";
  };

  downloadImage.setAttribute("src", url); // start download of image.
  imageElem.classList.add("carousel-photo");
  imageSrc.classList.add("carousel-src");
  if (photos === 0) {
    imageElem.classList.add("first");
  }
  imageElem.appendChild(imageSrc);
  gallery.appendChild(imageElem);
  photos++;
}

function setInitialClasses() {
  // Targets the previous, current, and next items
  // This assumes there are at least three items.
  galleryPhotos[photos - 1].classList.add("prev");
  galleryPhotos[0].classList.add("active");
  galleryPhotos[1].classList.add("next");
}

// handle gallery movement with arrow keys
function handleKey(event) {
  if (event.keyCode === 39) {
    moveNext();
  }
  if (event.keyCode === 37) {
    movePrev();
  }
}

function setEventListeners() {
  let next = document.getElementsByClassName("carousel-button-next")[0];
  let prev = document.getElementsByClassName("carousel-button-prev")[0];
  document.addEventListener("keydown", handleKey);
  next.addEventListener("click", moveNext);
  prev.addEventListener("click", movePrev);
}

function moveNext() {
  if (!moving) {
    slide++;
    slide = slide % photos;
    moveCarouselTo(slide);
  }
}

function movePrev() {
  if (!moving) {
    if (slide === 0) {
      slide = photos - 1;
    } else {
      slide--;
    }
    moveCarouselTo(slide);
  }
}

function disableInteraction() {
  moving = true;
  // set moving to false after waiting 500ms(the time for the animation to finish)
  setTimeout(function() {
    moving = false;
  }, 500);
}

function moveCarouselTo(slide) {
  if (!moving) {
    disableInteraction();

    let newPrevSlide = slide - 1;
    let newNextSlide = slide + 1;
    let oldPrevSlide = slide - 2;
    let oldNextSlide = slide + 2;

    if (photos - 1 > 3) {
      if (newPrevSlide <= 0) {
        oldPrevSlide = photos - 1;
      } else if (newNextSlide >= photos - 1) {
        oldNextSlide = 0;
      }

      if (slide === 0) {
        newPrevSlide = photos - 1;
        oldPrevSlide = photos - 2;
        oldNextSlide = slide + 1;
      } else if (slide === photos - 1) {
        newPrevSlide = slide - 1;
        newNextSlide = 0;
        oldNextSlide = 1;
      }

      // set the old prev/next to ordinary/hidden photos.
      galleryPhotos[oldPrevSlide].className = "carousel-photo";
      galleryPhotos[oldNextSlide].className = "carousel-photo";

      // set new prev/next to be the visible photos.
      galleryPhotos[newPrevSlide].className = "carousel-photo prev";
      galleryPhotos[slide].className = "carousel-photo active";
      galleryPhotos[newNextSlide].className = "carousel-photo next";
    }
  }
}

function initCarousel() {
  setInitialClasses();
  setEventListeners();
  moving = false;
}

/* Touch controls */
let xDown = null;
function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
}

function handleTouchMove(evt) {
  if (!xDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let xDiff = xDown - xUp;

  if (xDiff > 0) {
    moveNext();
  } else {
    movePrev();
  }
  /* reset values */
  xDown = null;
}

function initTouch() {
  const carousel = document
    .getElementsByClassName("carousel-container")
    .item(0);
  carousel.addEventListener("touchstart", handleTouchStart, false);
  carousel.addEventListener("touchmove", handleTouchMove, false);
}

/* function to switch between full-width and half-width demo page */
function switchDemo() {
  const halfs = document.getElementsByClassName("demo-half");
  const fulls = document.getElementsByClassName("demo-full");
  if (half === true) {
    for (let i = 0; i < halfs.length; i++) {
      if (halfs.item(i).classList.contains("carousel-container")) {
        halfs.item(i).className = "carousel-container demo-full";
        i--;
      } else {
        halfs.item(i).classList.add("hidden");
      }
    }
    for (let i = 0; i < fulls.length; i++) {
      fulls.item(i).classList.remove("hidden");
    }
  } else {
    for (let i = 0; i < fulls.length; i++) {
      if (fulls.item(i).classList.contains("carousel-container")) {
        fulls.item(i).className = "carousel-container demo-half";
        i--;
      } else {
        fulls.item(i).classList.add("hidden");
      }
    }
    for (let i = 0; i < halfs.length; i++) {
      halfs.item(i).classList.remove("hidden");
    }
  }
  half = !half;
}
