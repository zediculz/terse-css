import { terseCSS, createTheme, applyTheme } from "../../src/index"

//PROVIDE YOUR CUSTOM THEME
const myThemes = createTheme({
    color: {
        primary: "purple"
    },
    breakpoints: {
        sm: "max-width:390px",
        md: "max-width:768px"
    },
    vars: [
        { name: "primary", value: "#0000ff" },
        { name: "bo", value: "rebeccapurple" },
    ],
    transition: ".20s all ease-in"
})

//START GLOBALCSS AND USE UTILITY CLASS IN YOUR HTML
terseCSS.startGlobalCSS(myThemes)