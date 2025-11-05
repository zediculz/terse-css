import { terseCSS, createTheme } from "../../src/index"

const vars = [
    { name: "primary", value: "red" },
    { name: "bo", value: "rebeccapurple" },
    {name: "width", value: "1000px"},
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
console.log(terseCSS)