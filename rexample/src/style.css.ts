/* eslint-disable @typescript-eslint/no-unused-vars */
import { terseCSS, tStyleMachine, tStyle, createTheme } from "../../src/index"

const vars = [
    { name: "primary", value: "#0000ff" },
    { name: "bo", value: "rebeccapurple" },
    { name: "width", value: "1000px" },
]

const myThemes = createTheme({
    color: {
      primary: "#1800dd",
      secondary: "#000"
    },
    breakpoints: {
        sm: "max-width:390px",
        md: "max-width:768px"
    },
    vars,
  transition: ".2s all ease-in",
  font: '"Roboto Mono", monospace"'
})


const wrap = tStyle({
  "@vstack": "45%:50%",
  align: "center",
  text: "center"
})

export const stack = tStyle({
  "@vstack": "100%:100dvh",
  align: "center",
  jus: "center"
})

//"w-156px h-auto hover:w-165px cur"
const img = tStyle({
  w: "124px",
  h: "auto",
  cur: "pointer",
  "@hover": {
    w: "160px",
    h: "auto"
  }
})

const h = tStyle({
  "@case": "cap",
  font: "16pt",
  text: "center",
  sm: {
    font: "13pt"
  }
})

const p = tStyle({
  "@case": "low",
  font: "10pt",
  text: "center",
  sm: {
    font: "8pt"
  }
})

const b = tStyle({
  "@case": "up",
  c: "var(primary)"
})

const span = tStyle({
  pd: "8px",
  font: "12pt",
  fontw: "bold",
  cur: "pointer",
})

const style = tStyleMachine({
  stack, img, wrap, h, b, p, span
})

export default style
console.log(terseCSS)