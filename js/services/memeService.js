'use strict'

var gImgs = [
    { id: 1, url: 'meme-imgs (square)/1.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/2.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/3.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/4.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/5.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/6.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/7.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/8.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/9.jpg', keywords: ['Funny', 'Crazy'] },
    { id: 2, url: 'meme-imgs (square)/10.jpg', keywords: ['Funny', 'Crazy'] }
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'Funny': 12, 'Crazy': 16, 'Sarcastic': 2 }

function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    renderMeme()
}

function setColor(color) {
    gMeme.lines[0].color = color
    renderMeme()
}