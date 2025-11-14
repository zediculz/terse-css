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
  height: "50%"
}, [flex])

const img = style({
  width: "145px",
  height: "auto",
  cursor: "pointer",
  ":hover": {
    width: "156px"
  }
})

const stack = style({
  width: "100%",
  height: "50%",
  textAlign: "center",
  justifyContent: "space-eenly",
},[flex])

const h = style({
    fontSize: "21pt",
    color: "blue",
  width: "70%",
    padding: "12px"
})

const p = style({
    width: "90%",
    fontSize: "8pt"
})

const div = style({
  width: "90%",
  height: "60px",
  fontSize: "8pt",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "1rem"
})

const btn = style({
  width: "165px",
  height: "44px",
  fontSize: "12pt",
  background: "#0000ff",
  color: "#fff",
  outline: "none",
  cursor: "pointer",
  borderRadius: "8px",
  border: "none",
})


const span = style({
    width: "100px",
  fontSize: "10pt",
  padding: "1rem",
  ":hover": {
      color: "#0000ff"
    }
})

//entry point
const mystyle = terseCSS.create({wrap, st, stack, img, h, p, div, btn, span })
export default mystyle