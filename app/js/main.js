// Your scripts goes here...

document.addEventListener("DOMContentLoaded", function() {
  console.log("Taking off... 🚀");
  let images = [];
  fetch(
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=0d8c0f6a218bd0f4408bda4965712e2e&tags=cat&safe_search=1&content_type=1&media=photos&per_page=15&page=2;"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(JSON.stringify(json));
    });
});
