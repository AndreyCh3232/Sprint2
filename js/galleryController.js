'use strict'

function renderGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = gImgs.map(img =>
        `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    ).join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
}

renderGallery()