const S = sel => document.querySelector(sel)

const palette = S('.palette')
const colors = [
    "rgb(254,153,135)",
    "rgb(141,182,238)",
    "rgb(181,147,242)",
    "rgb(104,219,162)",
    "rgb(244,191,27)",
]
colors.forEach(color => {
    let div = document.createElement('div')
    div.style.background = color
    div.setAttribute("class", "color")
    div.onclick = () => setColor(color)
    palette.appendChild(div)
})

const setColor = color => {
    S('.tag').style.background = color
    S('body').style.background = (color === "rgb(244,191,27)" ? "#222222" : color)
}

const setRender = str => {
    const needChange = [".left", ".tag", ".name"]
    if (str === '') str = "-"
    needChange.forEach(sel => {
        S(sel).innerText = str.substr(0, 6)
    })
    S(".pop").innerHTML = `<span>${str}<span/>`
    textFit(document.getElementsByClassName('left'), {
        multiLine: true
    })
}

const copy = () => {
    let main = S('.main')
    html2canvas(main, {
        scale: 1
    }).then(canvas => {
        let eleLink = document.createElement('a')
        eleLink.download = 'quadre-maker'
        eleLink.style.display = 'none'
        eleLink.href = canvas.toDataURL('image/png')
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
    })
}

const zoom = 0.5

const selfReflectLoop = () => {
    html2canvas(S('.main')).then(canvas => {
        S('.pop > *').replaceWith(canvas)
        S('.pop').style.transform = `scale(${zoom})`
        let rect = S('.pop').getClientRects()[0]
        S('.bottom').style.width = `${rect.width}px`
        S('.bottom').style.height = `${rect.height}px`
        S('.pop').style.width = `${rect.width/zoom}px`
    })
}