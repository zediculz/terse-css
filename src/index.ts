
///<reference lib="dom" />

import TerseCore from "./core";
import { util } from "./utils";
import type { TerseVar, TObject, TOBJ  } from "./utils";

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
  //console.log(varResult)
  return varResult
}


export const style = (style:Partial<CSSStyleDeclaration>|TOBJ, bases?:Partial<CSSStyleDeclaration>[]|TOBJ[]) => {
  const cls = terse.AST(style)
  if (bases) {
    if (bases.length === 0) {
    return cls
  } else {
    
    let obj = {}
    bases.map(base => {
      Object.assign(obj, base)
    })
    
    const merged = Object.assign(style, obj)
    const cls = terse.AST(merged)
    return cls
  }
  } else {
    return cls
  }
}


export const globalStyle = (style:Partial<CSSStyleDeclaration>|TOBJ, bases?:Partial<CSSStyleDeclaration>[]|TOBJ[]) => {
  const cls = terse.AST(style)
  if (bases) {
    if (bases.length === 0) {
    return cls
  } else {
    
    let obj = {}
    bases.map(base => {
      Object.assign(obj, base)
    })
    
    const merged = Object.assign(style, obj)
    const cls = terse.AST(merged)
    return cls
  }
  } else {
    return cls
  }
}

export const mixin = (style:Partial<CSSStyleDeclaration>|TOBJ) => style as Partial<CSSStyleDeclaration>


//terseObjet
export const terseCSS =  {
  createTheme(theme:TerseTheme) {
    return terse.createTheme(theme)
  },

  create(style:TObject) {
    return terse.create(style)
  },

  globalVars() {}
}

console.log(terse)