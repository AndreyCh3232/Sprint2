'use strict'

function onInit() {
    renderKeywords()
    renderGallery()
    setEventListeners()
}

const keywords = {
    "Funny": 2,
    "Sad": 3,
    "Happy": 4,
    "Crazy": 2,
    "lol": 3,
    "haha": 4,
    "Sarcastic": 2,
    "wow": 3
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
        })
        keywordCloud.appendChild(span)
    }
}
// 
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
        changeFontSize(2);
    })

    document.getElementById('decrease-font').addEventListener('click', () => {
        changeFontSize(-2);
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
}

function addLine() {
    gMeme.lines.push({
        txt: 'Enter meme text',
        size: 30,
        color: 'red',
        x: 250,
        y: gMeme.lines.length * 50 + 50,
        width: 0,
        height: 0
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    document.getElementById('meme-text').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme()
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
    document.getElementById('meme-text').value = gMeme.lines[gMeme.selectedLineIdx].txt
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
        document.getElementById('meme-text').value = gMeme.lines[selectedLine].txt
        document.getElementById('text-color').value = gMeme.lines[selectedLine].color
        renderMeme();
    }
}