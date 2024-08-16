'use strict'

var lastClickedLink = null

function onInit() {
    document.getElementById('search-bar').addEventListener('input', searchMemes)
    renderKeywords()
    renderGallery()
    setEventListeners()
    enableDragAndDrop()
    renderGallery(gImgs)
}

function searchMemes() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase()
    const filteredImgs = gImgs.filter(img => img.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)))
    renderGallery(filteredImgs)
}

function showGalleryAndInit() {
    showGallery()
    renderGallery()
}

function showGallery() {
    document.getElementById('main-content').classList.remove('hidden')
    document.getElementById('gallery-section').classList.remove('hidden')
    document.getElementById('saved-memes-section').classList.add('hidden')
    document.getElementById('canvas-content').classList.add('hidden')
    document.getElementById('btn-content').classList.add('hidden')
    renderGallery(gImgs)
}

function showSaved() {
    document.getElementById('main-content').classList.remove('hidden')
    document.getElementById('saved-memes-section').classList.remove('hidden')
    document.getElementById('gallery-section').classList.add('hidden')
    document.getElementById('canvas-content').classList.add('hidden')
    document.getElementById('btn-content').classList.add('hidden')
}

function handleClick(event) {
    event.preventDefault()
    if (lastClickedLink) {
        lastClickedLink.style.backgroundColor = ''
        lastClickedLink.style.color = 'white'
    }
    this.style.backgroundColor = 'white'
    this.style.color = 'black'
    this.style.borderRadius = '10px'
    lastClickedLink = this
}

document.addEventListener('DOMContentLoaded', function () {
    var galleryLink = document.getElementById('gallery-link')
    galleryLink.style.backgroundColor = 'white'
    galleryLink.style.color = 'black'
    galleryLink.style.borderRadius = '10px'
    lastClickedLink = galleryLink

    document.getElementById('gallery-link').addEventListener('click', function (event) {
        handleClick.call(this, event)
        showGalleryAndInit()
    })

    document.getElementById('saved-link').addEventListener('click', function (event) {
        handleClick.call(this, event)
        showSaved()
    })

    document.getElementById('randomize-link').addEventListener('click', handleClick)
})

const keywords = {
    "Angry": 2,
    "Sleep": 3,
    "Happy": 4,
    "Love": 2,
    "lol": 3,
    "haha": 4,
    "Sarcastic": 2,
    "Wow": 3
}

function renderKeywords() {
    const keywordCloud = document.getElementById("keyword-cloud")
    keywordCloud.innerHTML = ""
    for (const [keyword, count] of Object.entries(keywords)) {
        const span = document.createElement("span")
        span.className = "keyword"
        span.textContent = keyword;
        span.style.fontSize = `${count * 10}px`
        span.addEventListener("click", () => {
            keywords[keyword]++
            renderKeywords()
            filterGallery(keyword)
        })
        keywordCloud.appendChild(span)
    }
}

function enableDragAndDrop() {
    const canvas = document.getElementById('meme-canvas')
    var isDragging = false
    var startX, startY
    var offsetXFromLine, offsetYFromLine

    canvas.addEventListener('mousedown', (ev) => {
        const { offsetX, offsetY } = ev
        const lineIdx = gMeme.lines.findIndex(line =>
            offsetX >= line.x - line.width / 2 &&
            offsetX <= line.x + line.width / 2 &&
            offsetY >= line.y - line.height + line.size / 2 &&
            offsetY <= line.y + line.size / 2
        )
        if (lineIdx !== -1) {
            gMeme.selectedLineIdx = lineIdx
            isDragging = true
            offsetXFromLine = offsetX - gMeme.lines[lineIdx].x
            offsetYFromLine = offsetY - gMeme.lines[lineIdx].y
            startX = offsetX
            startY = offsetY
        }
    })

    canvas.addEventListener('mousemove', (ev) => {
        if (isDragging) {
            const { offsetX, offsetY } = ev
            gMeme.lines[gMeme.selectedLineIdx].x = offsetX - offsetXFromLine
            gMeme.lines[gMeme.selectedLineIdx].y = offsetY - offsetYFromLine
            startX = offsetX
            startY = offsetY
            renderMeme()
        }
    })

    canvas.addEventListener('mouseup', () => {
        isDragging = false
    })
}

document.addEventListener('DOMContentLoaded', enableDragAndDrop)

function setEventListeners() {
    document.getElementById('language-select').addEventListener('change', function () {
        var selectedLanguage = this.value
        if (selectedLanguage === 'he') {
            document.documentElement.setAttribute('lang', 'he')
            document.body.dir = 'rtl'
        } else {
            document.documentElement.setAttribute('lang', 'en')
            document.body.dir = 'ltr'
        }
    })

    document.getElementById('meme-text').addEventListener('input', (ev) => {
        setLineTxt(ev.target.value)
        renderMeme()
    })
    document.getElementById('text-color').addEventListener('input', (ev) => {
        setColor(ev.target.value)
    })
    document.getElementById('increase-font').addEventListener('click', () => {
        changeFontSize(2)
    })

    document.getElementById('decrease-font').addEventListener('click', () => {
        changeFontSize(-2)
    })

    document.getElementById('add-line').addEventListener('click', () => {
        addLine()
    })

    document.getElementById('switch-line').addEventListener('click', () => {
        switchLine()
    })

    document.getElementById('meme-canvas').addEventListener('click', (ev) => {
        const { offsetX, offsetY } = ev
        selectLine(offsetX, offsetY)
    })

    document.getElementById('font-family').addEventListener('change', (ev) => {
        setFontFamily(ev.target.value)
    })
    document.getElementById('align-left').addEventListener('click', () => {
        setTextAlign(-10)
    })
    document.getElementById('align-center').addEventListener('click', () => {
        setTextAlignCenter()
    })
    document.getElementById('align-right').addEventListener('click', () => {
        setTextAlign(10)
    })
    document.getElementById('move-up').addEventListener('click', () => {
        moveLine(-10)
    })
    document.getElementById('move-down').addEventListener('click', () => {
        moveLine(10)
    })
    document.getElementById('delete-line').addEventListener('click', () => {
        deleteLine()
    })

    document.getElementById('randomize-link').addEventListener('click', () => {
        generateRandomMeme()
    })

    document.getElementById('save-meme').addEventListener('click', () => {
        saveMeme()
    })

    document.getElementById('saved-link').addEventListener('click', () => {
        renderSavedMemes()
    })

    document.getElementById('search-bar').addEventListener('input', (ev) => {
        filterGallery(ev.target.value)
    })
}

function addSticker(sticker) {
    gMeme.lines.push({
        txt: sticker,
        size: 30,
        color: 'red',
        x: 250,
        y: gMeme.lines.length * 50 + 50,
        width: 0,
        height: 0,
        font: 'Arial',
        align: 'center',
        isSticker: true
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}

function addLine() {
    gMeme.lines.push({
        txt: 'Enter meme text',
        size: 30,
        color: 'red',
        x: 250,
        y: gMeme.lines.length * 50 + 50,
        width: 0,
        height: 0,
        font: 'Arial',
        align: 'center'
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    document.getElementById('meme-text').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme()
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    document.getElementById('meme-text').value = selectedLine.txt
    document.getElementById('text-color').value = selectedLine.color
    document.getElementById('font-family').value = selectedLine.font
    renderMeme()
}

function selectLine(x, y) {
    const selectedLine = gMeme.lines.findIndex(line =>
        x >= line.x - line.width / 2 &&
        x <= line.x + line.width / 2 &&
        y >= line.y - line.height + line.size / 2 &&
        y <= line.y + line.size / 2
    )

    if (selectedLine !== -1) {
        gMeme.selectedLineIdx = selectedLine
        const line = gMeme.lines[selectedLine]
        document.getElementById('meme-text').value = line.txt
        document.getElementById('text-color').value = line.color
        document.getElementById('font-family').value = line.font
        renderMeme()
    }
}

function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily
    renderMeme()
}

function setTextAlignCenter() {
    const canvasWidth = 720
    const textWidth = gMeme.lines[gMeme.selectedLineIdx].width

    gMeme.lines[gMeme.selectedLineIdx].x = (canvasWidth / 2) - (textWidth / 2)
    gMeme.lines[gMeme.selectedLineIdx].y = (canvasWidth / 2) - (textWidth / 2)
    renderMeme()
}

function setTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].x += align
    renderMeme()
}

function moveLine(delta) {
    gMeme.lines[gMeme.selectedLineIdx].y += delta
    renderMeme()
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = Math.max(gMeme.selectedLineIdx - 1, 0)
    renderMeme()
}

document.getElementById('share-facebook').addEventListener('click', () => {
    const canvas = document.getElementById('meme-canvas')
    const dataUrl = canvas.toDataURL('image/png')

    const formData = new FormData()
    formData.append('source', dataUrl)

    fetch('https://graph.facebook.com/me/photos?access_token=YOUR_ACCESS_TOKEN', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                alert('Shared successfully!')
            } else {
                alert('Failed to share!')
            }
        })
})

document.getElementById('file-upload').addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
        const img = new Image()
        img.src = ev.target.result
        img.onload = () => {
            gMeme.selectedImgId = null
            gMeme.imgSrc = img.src
            renderMeme()
        }
    }
    reader.readAsDataURL(file)
})

function changeLanguage() {
    const language = document.getElementById('language-select').value
    if (language === 'he') {
        document.getElementById('gallery-link').textContent = 'גלריה'
        document.getElementById('saved-link').textContent = 'שמורים'
        document.getElementById('randomize-link').textContent = 'אקראי'
    } else {
        document.getElementById('gallery-link').textContent = 'Gallery'
        document.getElementById('saved-link').textContent = 'Saved'
        document.getElementById('randomize-link').textContent = 'Randomize'
    }
}

