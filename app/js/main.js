let photos = 0;
let slide = 0;
let moving = true;
let galleryPhotos;
// !(function(doc) {

// })(document);

document.addEventListener("DOMContentLoaded", function() {
  fetch(
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=0d8c0f6a218bd0f4408bda4965712e2e&tags=car&safe_search=1&content_type=1&media=photos&extras=url_o&per_page=25;"
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
    });
});

function appendPhoto(url) {
  const imageElem = document.createElement("img");
  const gallery = document.getElementById("gallery");

  imageElem.setAttribute("src", url);
  imageElem.classList.add("carousel-photo");
  if (photos === 0) {
    imageElem.classList.add("first");
  }
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

function setEventListeners() {
  var next = document.getElementsByClassName("carousel-button-next")[0],
    prev = document.getElementsByClassName("carousel-button-prev")[0];

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
      // set the old prev/next to ordinary photos.
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
