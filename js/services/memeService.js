'use strict'

var gImgs = [
    { id: 1, url: 'meme-imgs (square)/1.jpg', keywords: ['Funny'] },
    { id: 2, url: 'meme-imgs (square)/2.jpg', keywords: ['Crazy'] },
    { id: 3, url: 'meme-imgs (square)/3.jpg', keywords: ['Funny'] },
    { id: 4, url: 'meme-imgs (square)/4.jpg', keywords: ['Funny'] },
    { id: 5, url: 'meme-imgs (square)/5.jpg', keywords: ['Funny'] },
    { id: 6, url: 'meme-imgs (square)/6.jpg', keywords: ['Funny'] },
    { id: 7, url: 'meme-imgs (square)/7.jpg', keywords: ['Funny'] },
    { id: 8, url: 'meme-imgs (square)/8.jpg', keywords: ['Funny'] },
    { id: 9, url: 'meme-imgs (square)/9.jpg', keywords: ['Funny'] },
    { id: 10, url: 'meme-imgs (square)/10.jpg', keywords: ['haha'] }
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter meme text',
            size: 30,
            color: 'red',
            x: 250,
            y: 50,
            width: 0,
            height: 0
        }
    ]
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    renderMeme()
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}

function changeFontSize(delta) {
    gMeme.lines[gMeme.selectedLineIdx].size += delta
    renderMeme()
}

function generateRandomMeme() {
    const randomImgId = Math.floor(Math.random() * gImgs.length) + 1
    setImg(randomImgId)
    gMeme.lines = [{
        txt: 'Random Meme Text',
        size: 30,
        color: 'white',
        x: 250,
        y: 50,
        font: 'Arial',
        align: 'center'
    }]
    renderMeme()
}

function saveMeme() {
    const memes = memeService.getMemes()
    memes.push(gMeme)
    memeService.saveMemes(memes)
    alert('Meme saved!')
}

function renderSavedMemes() {
    const savedMemesSection = document.getElementById('saved-memes-section')
    const gallerySection = document.getElementById('gallery-section')
    savedMemesSection.classList.remove('hidden')
    gallerySection.classList.add('hidden')

    const savedMemesGallery = document.getElementById('saved-memes-gallery')
    const memes = memeService.getMemes()
    savedMemesGallery.innerHTML = memes.map((meme, index) => `
        <div class="saved-meme">
            <img src="${meme.imgUrl}" alt="Saved Meme" onclick="editSavedMeme(${index})">
        </div>
    `).join('')
}

function editSavedMeme(index) {
    const memes = memeService.getMemes()
    gMeme = memes[index]
    renderMeme()
}