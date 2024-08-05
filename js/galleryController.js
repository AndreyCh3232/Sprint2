'use strict'

function renderGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = gImgs.map(img =>
        `<img src="${img.url}" alt="Meme Image" onclick="onImgSelect(${img.id})">`
    ).join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
}