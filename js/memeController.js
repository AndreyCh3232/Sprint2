'use strict'

function renderMeme() {
    const canvas = document.getElementById('meme-canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = ''

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        ctx.font = '40px Arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(gMeme.lines[0].txt, canvas.width / 2, 50)
    }
}

document.getElementById('meme-text').addEventListener('input', (ev) => {
    setLineTxt(ev.target.value)
    renderMeme()
})