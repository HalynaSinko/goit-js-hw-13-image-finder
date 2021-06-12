import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onGalleryClick(event) {
  const isGalleryImg = event.target.tagName === "IMG"
  //   console.dir(event.target);

  if (!isGalleryImg) {
      return;
  }
  basicLightbox.create(`<img src="${event.target.dataset.source}" width="100%">`).show();

}

export { onGalleryClick };