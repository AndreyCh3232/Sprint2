'use strict'

const memeService = {
    getMemes: function () {
        return JSON.parse(localStorage.getItem('memes') || '[]')
    },
    saveMemes: function (memes) {
        localStorage.setItem('memes', JSON.stringify(memes))
    }
}