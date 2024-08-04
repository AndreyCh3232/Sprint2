'use strict'

const keywords = {
    "Funny": 3,
    "Sad": 4,
    "Happy": 5,
    "Crazy": 3,
    "lol": 4,
    "haha": 5,
    "Sarcastic": 3,
    "wow": 4
}

const keywordCloud = document.getElementById("keyword-cloud")

function renderKeywords() {
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
renderKeywords()

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

function setLineTxt(text) {
    gMeme.lines[0].txt = text
}

renderGallery()
renderMeme()