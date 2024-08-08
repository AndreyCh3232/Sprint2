'use strict'

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randomizeMeme() {
    const randomIndex = Math.floor(Math.random() * gImgs.length)
    const randomImg = gImgs[randomIndex]
    renderGallery([randomImg])
}