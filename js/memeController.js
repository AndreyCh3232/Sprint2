'use strict'

function renderMeme() {
    const canvas = document.getElementById('meme-canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    const selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId)
    img.src = selectedImg ? selectedImg.url : 'meme-imgs (square)/1.jpg'

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        gMeme.lines.forEach((line, idx) => {
            ctx.font = `${line.size}px Arial`
            ctx.fillStyle = line.color
            ctx.textAlign = 'center'
            ctx.fillText(line.txt, line.x, line.y)
            if (idx === gMeme.selectedLineIdx) {
                drawTextBox(ctx, line);
            }
        })
        updateDownloadLink(canvas)
    }

    document.getElementById('canvas-content').classList.remove('hidden')
    document.getElementById('main-content').classList.add('hidden')
}

function updateDownloadLink(canvas) {
    const downloadLink = document.getElementById('download-link')
    downloadLink.href = canvas.toDataURL('image/png')
}

function drawTextBox(ctx, line) {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    const textMetrics = ctx.measureText(line.txt)
    const textHeight = line.size
    const padding = 5

    line.width = textMetrics.width
    line.height = textHeight + padding * 2

    ctx.strokeRect(
        line.x - textMetrics.width / 2 - padding,
        line.y - textHeight,
        textMetrics.width + padding * 2,
        textHeight + padding * 2
    )
}
