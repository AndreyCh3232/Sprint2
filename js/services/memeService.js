'use strict'

var gImgs = [
    { id: 1, url: 'meme-imgs (square)/1.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/2.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 3, url: 'meme-imgs (square)/3.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 4, url: 'meme-imgs (square)/4.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 5, url: 'meme-imgs (square)/5.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 6, url: 'meme-imgs (square)/6.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 7, url: 'meme-imgs (square)/7.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 8, url: 'meme-imgs (square)/8.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 9, url: 'meme-imgs (square)/9.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 10, url: 'meme-imgs (square)/10.jpg', keywords: ['Funny', 'Crazy'] }
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