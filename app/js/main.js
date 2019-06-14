// Your scripts goes here...

document.addEventListener("DOMContentLoaded", function() {
  fetch(
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=0d8c0f6a218bd0f4408bda4965712e2e&tags=cat&safe_search=1&content_type=1&media=photos&extras=url_o&per_page=15&page=2;"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      jsonPhotos = json.photos.photo;
      for (let i = 0; i < jsonPhotos.length; i++) {
        if (jsonPhotos[i] && jsonPhotos[i].url_o) {
          appendPhoto(jsonPhotos[i].url_o);
        }
      }
    });
});

function appendPhoto(url) {
  const imageElem = document.createElement("img");
  imageElem.setAttribute("src", url);
  document.getElementById("gallery").appendChild(imageElem);
}
