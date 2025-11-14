
///<reference lib="dom" />

import TerseCore from "./core";
import { util } from "./utils";
import type { TerseVar, TObject, TOBJ, TOBJECT  } from "./utils";

export interface TerseTheme {
    title?: string,
    color?: {
        primary?: string,
        secondary?: string
    }
    breakpoints?: {
        sm?: string,
        md?: string
        lg?: string
    },
    root?: string,
    vars?: TerseVar[],
    font?: string,
    fontUrl?: string
    transition?: string
}

//Core init
const terse = new TerseCore();

////Terse hooks
export const createVars = (vars:TerseVar|TerseVar[]) => {
  const arr = vars instanceof Array ? vars : [vars]
  const varResult = util.createVars(arr)
  console.log(varResult)
}

export const style = (style:Partial<CSSStyleDeclaration>|TOBJ) => {
  const shs = terse.AST(style)
  return shs
}

export const globalStyle = (style:Partial<CSSStyleDeclaration>|TOBJ, ...bases:string[]) => {
  const cls = terse.AST(style)

  if (bases.length === 0) {
    return cls
  } else {
    const base = bases.join(" ")
    const s = `${cls} ${base}`
    console.log(s)
    return s
  }
}


//terseObjet
export const terseCSS =  {
  createTheme(theme:TerseTheme) {
    return terse.createTheme(theme)
  },

  create(style:TObject) {
    return terse.create(style)
  }
}

console.log(terse)