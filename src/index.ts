///<reference lib="dom" />

import { tUtils } from "./utils";
import type { TerseVar, TObject } from "./utils";
import type { TOBJECT } from "./tobj";
import TerseCSS, { TerseTheme } from "./core";


///////////////////////////////////////////////////////////////////
//HOOKS FOR *css.ts files
//ADD ONS FOR TERSECSS ON REACT LIKE AND CLASSNAME GENERATION

//Scoped Runtime hook
/**@function tStyleMachine(style) create scope CSS in *.css.ts file for your App. */
export const tStyleMachine = (style: TObject) => terseCSS.scopeRuntimeCore(style)

/**@function tStyle(style) TerseCSS utility object creator */
export const tStyle = (style: TOBJECT, ...bases: string[] | TOBJECT[]) => {
  const shs = tUtils.machine(style)
  if (bases.length === 0) {
    return shs
  } else {
    const base = bases.join(" ")
    const s = `${shs} ${base}`
    return s
  }
}

/**@function tStyle(style) TerseCSS utility object creator */
export const tInlineStyle = (style: string) => style

export const createVars = (vars:TerseVar|TerseVar[]) => {
  const arr = vars instanceof Array ? vars : [vars]
  const varResult = tUtils.createVars(arr)
  console.log(varResult)
}


///////////////////////////////////////////////////////////////
//RUNTIME FOR GLOBAL AND UTILITY CLASSES
//TYPE-SAFETY HOOKS FOR TERSE CLASS
/**@function createTheme(theme) TerseCSS custom theme creator */
export const createTheme = (customTheme: TerseTheme) => tUtils.th(customTheme);

/**@function applyTheme(theme) TerseCSS theme applied */
export const applyTheme = (theme?: TerseTheme) => terseCSS.applyTheme(theme);

//main
/**@instance of TerseCSS */
//runtime
export const terseCSS = new TerseCSS();
//USE GLOBALCSS TO CREATE A GLOBAL CSSDOM STYLED WITH UTULITY CLASS 
//USE SCOPED CSS TO CREATE SCOPED CSSDOM WITH UTILITY OBJECTS