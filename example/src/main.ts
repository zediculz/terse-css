import { terseCSS, createTheme } from "../../src/index"

const myThemes = createTheme({
    color: {
        primary: "purple"
    },
    breakpoints: {
        sm: "max-width:390px",
        md: "max-width:768px"
    }
})

terseCSS.init(myThemes)
//terseCSS.start()