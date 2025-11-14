import type { TerseTheme } from "./index"

/**@default defaultTheme TerseCSS default theme. */
export const defaultTheme: TerseTheme = {
  title: "mystyle",
  color: {
    primary: "#000",
    secondary: "#1800dd"
  },
  breakpoints: {
    sm: "max-width:375px",
    md: "max-width:768px",
    lg: "min-width:1245px"
  },
  root: `font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;`,
  vars: [],
  font: "system-ui"
}

export interface TOBJECT {

    /**@description w width shorthand */
    w?: string;
    width?: string
    /**@description h height shorthand */
    h?: string;
    height?: string;
    
  /**@description maxw max-width */
    maxw?: string;
    maxWidth?: string
  /**@description maxw max-width, maxh max-height */
    maxh?: string;
    maxHeight?: string

    /**@description minh min-width */
    minw?: string;
    minWidth?: string

    /**@description minw min-height */
    minh?: string;
    minHeight?: string
    
    /**@description p postion */
    p?: string;
    /**@description p postion */
    pos?: string;
    postion?: string
    /**@description z z-index */
    z?: string;
    
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;

    /*display */
    /**@description dis display */
    dis?: string
    /**@description d display */
  d?: string
    display?: string
    
  float?: string;
clear?: string;
/**@example overf overflow */
  overf?: string;
  overflow?: string;

  //text
  font?: string
  fonts?: string
  fontf?: string
    fontw?: string
    
    /**@description c color */
    c?: string
    color?: string

  text?: string
  t?: string
  textd?: string
  textt?: string
  line?:string
  letter?:string
  word?:string


  //background
  /**@description bg background */
  bg?: string,
  /**@description bgc backgroundColor */
  bgc?: string,
  /**@description bgi backgroundImage */
    bgi?: string,
    
  bgr?: string,
  bgp?: string,
  bgs?: string,
  
 /**@description pd padding */
    pd?: string
 /**@description pdt padding-top */
    pdt?: string
 /**@description pdb padding-bottom */
    pdb?: string
 /**@description pdr padding-right */
    pdr?: string
 /**@description pdl padding-left */
    pdl?: string
    
  /**@description mg margin */
    mg?: string
 /**@description mg margin-top */
    mgt?: string
 /**@description mg margin-bottom */
    mgb?: string
 /**@description mg margin-right*/
    mgr?: string
 /**@description mg margin-left*/
  mgl?: string
  
  //flex
  jus?: string
  justify?: string
  jusi?: string
  flexd?: string,
  flexw?: string,
  flexf?: string,
  align?: string

  //effects
  cur?:string
  op?: string
  boxs?:string
  bs?:string
  rt?:string
  sc?: string
  scale?:string
  filter?:string
  trsl?:string
  trans?:string
  ani?:string
  outl?: string
  out?: string
  space?: string
  
    //border
    /**@description bd border. */
    bd?: string
    /**@description bdw border-width. */
    bdw?: string
    /**@description bds border-style. */
    bds?: string
    
    bdc?: string
    /**@description bdc border-radius. */
  bdr?: string

   //grid
  gtc?: string
  gtr?: string
  gta?: string
  gap?: string

    /*responsive */
    /**@description responsiveness command sm mean small screen. */
    sm?: TOBJECT;
    /**@description responsiveness command sm mean middle screen. */
    md?: TOBJECT;
    /**@description responsiveness command sm mean large screen. */
  lg?: TOBJECT;

    //extend ffects
    /**@description "@hover" a shorthand to create a hover effect. @example "@hover":{TOBJECT}. */
  "@hover"?: TOBJECT;

    //shorthand with @keyword
    /**@description "@wrap" wrap width:height without unit, wrap uses percentage fpr width and dvh for height. */
    "@wrap"?: string;

    /**@description "@rect" a shorthand to create a rectangle layout. @example "@rect":width:height == "@rect": 100px:100px. */
    "@rect"?: string;
    /**@description "@sq" a shorthand to create a square layout. @example "@sq":size == "@sq": 100px. */
    "@sq"?: string;

    /**@description "@case" a shorthand for text-transform. @example "@case":"cap", "@case":"low", "@case":"up". */
    "@case"?: string;

    /**@description "@vstack" a shorthand to create flex with column direction. @example "@vstack":width:height:space == "@vstack": 100px:100px:space:evenly. */
    "@vstack"?: string;
    /**@description "@hstack" a shorthand to create flex with row direction. @example "@hstack":width:height:space == "@hstack": 100px:100px:space:evenly. */
    "@hstack"?: string
}

export interface TOBJ {
  
    /*responsive */
    /**@description responsiveness command sm mean small screen. */
    sm?: Partial<CSSStyleDeclaration>|TOBJ;
    /**@description responsiveness command sm mean middle screen. */
    md?: Partial<CSSStyleDeclaration>|TOBJ;
    /**@description responsiveness command sm mean large screen. */
    lg?: Partial<CSSStyleDeclaration>|TOBJ;

    //extend ffects
    /**@description "@hover" a shorthand to create a hover effect. @example "@hover":{TOBJECT}. */
  ":hover"?: Partial<CSSStyleDeclaration>;
  ":focus"?: Partial<CSSStyleDeclaration>;

    //shorthand with @keyword
    /**@description "@wrap" wrap width:height without unit, wrap uses percentage fpr width and dvh for height. */
    "@wrap"?: string;

    /**@description "@rect" a shorthand to create a rectangle layout. @example "@rect":width:height == "@rect": 100px:100px. */
    "@rect"?: string;
    /**@description "@sq" a shorthand to create a square layout. @example "@sq":size == "@sq": 100px. */
    "@sq"?: string;

    /**@description "@case" a shorthand for text-transform. @example "@case":"cap", "@case":"low", "@case":"up". */
    "@case"?: string;

    /**@description "@vstack" a shorthand to create flex with column direction. @example "@vstack":width:height:space == "@vstack": 100px:100px:space:evenly. */
    "@vstack"?: string;
    /**@description "@hstack" a shorthand to create flex with row direction. @example "@hstack":width:height:space == "@hstack": 100px:100px:space:evenly. */
    "@hstack"?: string
}



export interface TerseToken {
  command: string;
  value: string;
  option?: string;
  media?: string;
  mediaType?: string
  effect?: string
}

export interface TerseAst {
  res: string
  env?: "global" | "media" | "effect" | "mediaEffect"
  rawClass?: string
  option?: string;
  media?: string;
  mediaType?: string
  effect?: string,
}
export interface TerseVar { name: string, value: string }
export interface TerseNode { tag?: string, classes: string, element?: Element, id?: number }

export interface TObject {
  [key: string]: Partial<CSSStyleDeclaration> | TOBJ | TerseTheme | string[]
}


function spliceCommand(command: string) {
  let text = ""
  command.split("").flatMap((name) => {
    if (name === String(name).toUpperCase() && name !== ":") {
      text += `-${name.toLowerCase()}`
    } else {
      text += name
    }
  })

  return text
}

function spliceEffect(command: string) {
  const text = command.split(":")
  return text[1]
}

function spObj(value: any) {
  let text = ''
  const keys = Object.keys(value)
  const values = Object.values(value)

  keys.flatMap((command, id) => {
    const value = values[id]
    const res = `${command}:${value};`
    text += res
  })

  return text
}

function spMobj(value: any, media: string, cls: string) {
  let mediaGlobal = ""
  let mediaEffect = ""

  const keys = Object.keys(value)
  const values = Object.values(value)

  keys.flatMap((key, id) => {
    const command = spliceCommand(key)
    const value = values[id]

    if (command[0] === ":") {
      const effect = spliceEffect(command)
      const val = spObj(value)
      const res = `&:${effect}{${val}}`
      mediaEffect += res

    } else {
      //Media GLOBAL
      const res = `${command}:${value};`
      mediaGlobal += res
    }
  })

  //console.log(mediaGlobal)
  //console.log(mediaEffect)
  //@media screen {.cls {color: pink; &:hover {color: violet}}}
  const res = `${media}{.${cls}{${mediaGlobal}${mediaEffect}}}`
  return res
}



/**@function resTheme TerseCSS theme resolver function. */
const createVars = (str: TerseVar[] | undefined) => {
  //console.log(str)
  let text = ""

  if (str !== undefined) {
    if (str.length === 0) {
      return ""
    } else {
      str.flatMap(s => {
        text += `--${s.name}:${s.value};`
      })

      return text
    }
  }

  return text
}

function ROOT(theme:TerseTheme) {
  const rootVars = theme.vars !== undefined ? createVars(theme?.vars) : ""
  const root = theme?.root === undefined ? `:root{${defaultTheme.root}${rootVars}}` : `:root{${theme.root}${rootVars}}`
  return root
}

export function resTheme(theme: TerseTheme) {

  const root = ROOT(theme)

  const tColor = theme?.color === undefined ? {} : theme?.color
  const tBk = theme?.breakpoints === undefined ? {} : theme?.breakpoints
 
  const newTheme: TerseTheme = {
    title: theme?.title === undefined ? defaultTheme.title : theme.title,
    color: { ...defaultTheme.color, ...tColor },
    breakpoints: { ...defaultTheme.breakpoints, ...tBk },
    root,
    vars: theme?.vars === undefined ? defaultTheme.vars : theme.vars,
    font: theme?.font === undefined ? defaultTheme.font : theme.font,
    fontUrl: theme?.fontUrl === undefined ? defaultTheme.fontUrl : theme.fontUrl,
    transition: theme?.transition === undefined ? defaultTheme.transition === undefined ? ".1s all ease-in" : "" : theme.transition
  }

  return newTheme
}

/**@function tMedia responsive media query */
const media = (media: string, theme?: TerseTheme) => {
  const th = theme === undefined ? defaultTheme : theme
  const bk = th?.breakpoints

  switch (media) {
    case "sm":
      return `@media screen and (${bk?.sm})`;
    case "md":
      return `@media screen and (${bk?.md})`;
    case "lg":
      return `@media screen and (${bk?.lg})`;
    case "dark":
      return `@media (prefers-color-scheme: ${media})`;
    case "hover":
      return "hover";
    case "focus":
      return "focus";

    default:
      return "";
  }
};


export const util = {
  spMobj, spObj, spliceCommand, spliceEffect, resTheme, media, createVars
}