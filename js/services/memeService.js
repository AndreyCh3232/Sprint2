'use strict'

var gImgs = [
    { id: 1, url: 'meme-imgs (square)/1.jpg', keywords: ['lol'] },
    { id: 2, url: 'meme-imgs (square)/2.jpg', keywords: ['Love'] },
    { id: 3, url: 'meme-imgs (square)/3.jpg', keywords: ['Sleep'] },
    { id: 4, url: 'meme-imgs (square)/4.jpg', keywords: ['Sleep'] },
    { id: 5, url: 'meme-imgs (square)/5.jpg', keywords: ['Angry'] },
    { id: 6, url: 'meme-imgs (square)/6.jpg', keywords: ['Wow'] },
    { id: 7, url: 'meme-imgs (square)/7.jpg', keywords: ['Wow'] },
    { id: 8, url: 'meme-imgs (square)/8.jpg', keywords: ['Happy'] },
    { id: 9, url: 'meme-imgs (square)/9.jpg', keywords: ['Sarcastic'] },
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
            font: 'Arial',
            align: 'center',
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

    const fonts = ['Arial', 'Comic Sans MS', 'Impact', 'Courier New']
    const colors = ['#FFFFFF', '#FF5733', '#33FF57', '#3357FF', '#FFFF33']
    const stickers = ['😜', '😍', '😂', '😃', '🤣', '😘', '🤩', '😎', '😉', '💣', '🚀', '💥', '👽', '💯', '👍', '🤪', '👻', '😁', '🙃', '😨', '🤖', '❤️', '🌸', '💫', '🎈', '🥳', '👾', '👎', '🫢', '🤯', '💟', '💤']


    const randomImgId = Math.floor(Math.random() * gImgs.length) + 1
    setImg(randomImgId)

    const lines = []
    const lineCount = Math.floor(Math.random() * 3) + 1

    for (var i = 0; i < lineCount; i++) {
        const randomSticker = getRandomElement(stickers)
        const randomFont = getRandomElement(fonts)
        const randomColor = getRandomElement(colors)
        const randomText = Math.random() < 0.5 ? randomSticker : 'Enter meme text'

        lines.push({
            txt: randomText,
            size: 30,
            color: randomColor,
            x: 250,
            y: 50 + i * 50,
            font: randomFont,
            align: 'center'
        })
    }

    gMeme.lines = lines
    renderMeme()
}

function saveMeme() {
    const canvas = document.getElementById('meme-canvas')
    const imgUrl = canvas.toDataURL('image/png')

    const memes = memeService.getMemes()
    memes.push({
        ...gMeme,
        imgUrl: imgUrl
    });
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
            <button onclick="deleteSavedMeme(${index})">❌</button>
        </div>
    `).join('')
}

function editSavedMeme(index) {
    const memes = memeService.getMemes()
    gMeme = memes[index]
    renderMeme()
}

function deleteSavedMeme(index) {
    const memes = memeService.getMemes()
    memes.splice(index, 1)
    memeService.saveMemes(memes)
    renderSavedMemes()
}