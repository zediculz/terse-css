import { terseCSS, createTheme, useStyleMachine, tObject } from "../../src/index"

const vars = [
    { name: "primary", value: "#0000ff" },
    { name: "bo", value: "rebeccapurple" },
    { name: "width", value: "1000px" },
]

const myThemes = createTheme({
    color: {
        primary: "purple"
    },
    breakpoints: {
        sm: "max-width:390px",
        md: "max-width:768px"
    },
    vars,
    transition: ".20s all ease-in"
})

terseCSS.init(myThemes)
//console.log(terseCSS)

const wrap = {
    w: "100px",
    h: "100px",
    bg: "red",
    "@wrap": "100:400",
    sm: {
        bg: "pink"
    }
}

const text = {
    font: "56pt",
    color: "blue",
    sm: {
        color: "green"
    }
}

const more = tObject({
    color: "red"
})

const styles = {
    wrap, text, more
}

const obj = useStyleMachine(styles)
console.log(terseCSS)

const el = document.getElementById("s")
if (el) {
    el.classList.add(obj.text)
}