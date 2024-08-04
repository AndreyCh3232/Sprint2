'use strict'

function renderMeme() {
    const canvas = document.getElementById('meme-canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    const selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId)
    img.src = selectedImg ? selectedImg.url : 'meme-imgs (square)/1.jpg'

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        ctx.font = '40px Arial'
        ctx.fillStyle = gMeme.lines[0].color
        ctx.textAlign = 'center'
        ctx.fillText(gMeme.lines[0].txt, canvas.width / 2, 50)
        updateDownloadLink(canvas);
    }
}

function updateDownloadLink(canvas) {
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = canvas.toDataURL('image/png');
}