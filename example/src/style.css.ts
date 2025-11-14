/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  terseCSS,
  createVars,
  style,
  mixin
} from "../../src/index"


//PROVIDE YOUR CUSTOM THEME
terseCSS.createTheme({
  title: "dhuri",
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
  transition: ".2s all ease-in",
  font: "roboto",
  fontUrl: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap'
})

//uses utility object to
export const container = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start"
})

//create variables
createVars([{name: "newcolor", value: "purple"}])

const wrap = style({
  width: "50%",
  height: "60%",
  cursor: "pointer",
  marginTop: "6rem",
  display: "flex",
  flexDirection: "column",
})

const flex = mixin({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
})


const st = style({
  width: "100%",
  height: "56%"
}, [flex])

const img = style({
  width: "145px",
  height: "145px",
  cursor: "pointer",
  ":hover": {
    width: "156px"
  }
})

const stack = style({
  height: "44%",
  background: "violet",
  textAlign: "center",
},[flex])


//entry point
const mystyle = terseCSS.create({wrap, st, stack, img })
export default mystyle