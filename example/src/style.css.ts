/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  applyTheme,
  createTheme,
  terseCSS,
  tStyle,
  tStyleMachine,
} from "../../src/index"


//PROVIDE YOUR CUSTOM THEME
const myThemes = createTheme({
  color: {
    primary: "purple",
    secondary: "red"
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


applyTheme(myThemes)

const wrapper = tStyle({
  width: "100%",
  h: "100dvh",
  bg: "red",
  color: "green"
})

const style = tStyleMachine({wrapper})
export default style

console.log(terseCSS) 