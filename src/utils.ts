import type { TerseTheme } from "./index"
import tShs from "./shs";

export interface Token {
  command: string;
  value: string;
  option?: string;
  media?: string;
  mediaType?: string
  effect?: string
}

export interface ASTType {
  res: string
  env?: "global"|"media"|"effect"|"mediaEffect"
  rawClass?: string
  option?: string;
  media?: string;
  mediaType?: string
  effect?: string,
}

export interface Node { tag: string, classes: string, element: Element, id: number }

/**@function tMedia responsive media query */
const tMedia = (media: string, theme?: TerseTheme) => {

  const bk = theme?.breakpoints

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

/**@function tClassName TerseCSS classname generator function. */
const tClassName = (node: Node) => {
  const alpha = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
  ];
  
  const tag = node.tag
  const r1 = alpha[Math.floor(Math.random() * 25)];
  const r2 = alpha[Math.floor(Math.random() * 25)];
  const r3 = alpha[Math.floor(Math.random() * 25)];
  const r4 = alpha[Math.floor(Math.random() * 25)];
  const r5 = alpha[Math.floor(Math.random() * 20)];
  const r6 = alpha[Math.floor(Math.random() * 15)];

  return `${tag}_${r2}${r1}${r5}${r4}${r6}${r3}${r5}${r6}`;
};

export interface TerseVar {
  name: string 
  value:string
}

const createVars = (str:TerseVar[]|undefined) => {
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

/**@default defaultTheme TerseCSS default theme. */
export const defaultTheme: TerseTheme = {
  title: "mystyle",
  color: {
    primary: "#000",
    secondary: "#f5f5f5"
  },
  breakpoints: {
    sm: "max-width:375px",
    md: "max-width:768px",
    lg: "min-width:1245px"
  },
  root: `font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;`,
  vars: [],
  fontFamily: "system-ui"
}

/**@function resTheme TerseCSS theme resolver function. */
export function resTheme(theme: TerseTheme) {

  const vars = createVars(theme?.vars)
  const rootVars = theme.vars !== undefined ? vars : ""

  const tColor = theme?.color === undefined ? {} : theme?.color
  const tBk = theme?.breakpoints === undefined ? {} : theme?.breakpoints
  const root = theme?.root === undefined ? `:root{${defaultTheme.root}${rootVars}}` : `:root{${theme.root}${rootVars}}`

  const newTheme: TerseTheme = {
    title: theme?.title === undefined ? defaultTheme.title : theme.title,
    color: { ...defaultTheme.color, ...tColor },
    breakpoints: { ...defaultTheme.breakpoints, ...tBk },
    root,
    vars: theme?.vars === undefined ? defaultTheme.vars : theme.vars,
    fontFamily: theme?.fontFamily === undefined ? defaultTheme.fontFamily : theme.fontFamily,
    transition: theme?.transition === undefined ? defaultTheme.transition === undefined ? ".1s all ease-in" : "" : theme.transition
  }

  return newTheme
}

/**@function shOneLiner TerseCSS one-line shorthand utiltiy function. */
const shOneLiner = (command: string) => {
  switch (command) {
    case "center":
      return "d-flex align-center justify-center";
    case "container":
      return "w-100% h-100dvh d-flex";
    case "flex":
      return "d-flex align-center justify-start";
    case "btn":
      return "w-200px h-50px out-none bdr-8px center font-14pt bd-none out-none cur-pointer";
    case "primarybtn":
      return "btn bg-red";
    default:
      return "";
  }
};

/**@function shOneLiner TerseCSS one-line shorthand utiltiy function. */
const shOneLinerOption = (str: string[]) => {

  const command = str[0]
  const option = str[1]
  const more = str[2] !== undefined ? str[2] : "" 

  //stacks
  const stackFunc = (str: string) => {
    if (str === "around" || str === "evenly") {
      return `space:${str}`
    } else {
      return str
    }
  }
  const stackOpt = str[3] !== undefined ? stackFunc(str[3]) : "space:evenly"
  
  switch (command) {
    case "@wrap":
      return `w-${option}% h-${option}dvh`;
    case "@layout":
      return `w-${option}% h-${option}dvh`;
    case "@rect":
      return `w-${option} h-${more}`;
    case "@sq":
      return `w-${option} h-${option}`;
    case "@vstack":
      return `w-${option} h-${more} flex flexd-column justify-${stackOpt}`;
    case "@hstack":
      return `w-${option} h-${more} flex flexd-row justify-${stackOpt}`;
    case "center":
      return `center flexd-${option}`;
    default:
      return "";
  }
};

/**@method tUtils TerseCSS Utils functions. */
export const tUtils = {
  com: tShs,
  media: tMedia,
  classname: tClassName,
  one: shOneLiner,
  oneOpt: shOneLinerOption,
  th: resTheme
};
