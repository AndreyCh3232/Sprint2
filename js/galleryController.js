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

function filterGallery(keyword) {
    const filteredImgs = gImgs.filter(img => img.keywords.includes(keyword))
    const galleryContainer = document.getElementById('gallery-container')
    galleryContainer.innerHTML = filteredImgs.map(img =>
        `<img src="${img.url}" alt="Meme Image" onclick="onImgSelect(${img.id})">`
    ).join('')
}

document.getElementById('filter-input').addEventListener('input', (ev) => {
    filterGallery(ev.target.value)
})