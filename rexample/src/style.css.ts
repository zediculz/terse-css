import { tStyleMachine, tStyle } from "../../src/index"

const wrap = tStyle({
  "@vstack": "100%:100dvh",
  dis: "flex",
  jus: "space-evenly"
})

const hi = tStyle({
   "@sq": "50%",
    center: "column",
    jus: "space-evenly",
    color: "black",
    font: "10pt",
})

const img = "w-156px h-auto bdr-12px hover:w-165px cur"
const h1 = "case:cap font-18pt sm:font-13pt"
const p = "font-10pt case:low sm:w-100% sm:font-8pt"
const b = "case:cap c-var(primary)"
const span = "pd-8px bdr-8px font-12pt fontw-bold bdc-red cur"

const style = tStyleMachine({ wrap, hi, img, p, h1, b, span })
export default style