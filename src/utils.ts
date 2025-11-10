import type { TerseTheme } from "./index"
import tShs from "./shs";

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
export interface TerseNode { tag?: string, classes: string, element?: Element, id: number }

/*


    case "p":
      return "position";
    case "pos":
      return "position";
    case "top":
      return "top";
    case "bottom":
      return "bottom";
    case "left":
      return "left";
    case "right":
      return "right";
    case "z":
      return "z-index";
    case "pd":
      return "padding";
    case "pdl":
      return "padding-left";
    case "pdr":
      return "padding-right";
    case "pdt":
      return "padding-top";
    case "pdb":
      return "padding-bottom";
    case "mg":
      return "margin";
    case "mgl":
      return "margin-left";
    case "mgr":
      return "margin-right";
    case "mgt":
      return "margin-top";
    case "mgb":
      return "margin-bottom";
    case "float":
      return "float";
    case "clear":
      return "clear";
    case "overf":
      return "overflow";
    case "overflow":
      return "overflow";

*/

  
export interface TOBJECT {
  w?: string;
  h?: string;
  maxw?: string;
  maxh?: string;
  minw?: string;
  minh?: string;
  /*display */
  dis?: string
  d?: string
  "@wrap"?: string; "@rect"?: string; "@sq"?: string;  "@case"?: string;
  "@stack"?: string; "@vstack"?: string; "@hstack"?: string;
  font?: string
  color?: string
  bg?: string,
  sm?: TOBJECT;
  md?: TOBJECT;
  lg?: TOBJECT;
  center?: string
  jus?: string
  flex?: string,
}

export interface TObject {
  [key: string]: TOBJECT | TerseTheme | string
}

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
const tClassName = (node: TerseNode) => {
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

  const rootVars = theme.vars !== undefined ? createVars(theme?.vars) : ""

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
    case "cur":
      return "cur-pointer";
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

  const textCap = (option: string) => {
    switch (option) {
      case "up":
        return "uppercase"
      case "low":
        return "lowercase"
      case "cap":
        return "capitalize"

      default:
        break;
    }
  }

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
    case "case":
      return `textt-${textCap(option)}`;
    case "cap":
      return "textt-capitalize";
    case "upcase":
      return "textt-uppercase";
    case "b":
      //console.log(str)
      return "";
    default:
      return "";
  }
};

//ADD ONs
function scope(style: TOBJECT) {

  if (typeof style !== "object") {
    return style
  } else {

    const keys = Object.keys(style)
    const values = Object.values(style)

    const arr: string[] = []
    const checkMedia = (c: string) => c === "sm" || c == "md" || c === "lg"
    const checkFirst = (c: string) => c.split("")[0] === "@"

    keys.forEach((command, index) => {
      const value = values[index]

      if (checkFirst(command)) {
        arr.push(`${command}:${value}`)
      } else if (checkMedia(command)) {
        const resclass = scope(value)
        const val = () => {
          let t = ""
          resclass.split(" ").forEach(v => {
            t += `${command}:${v} `
          })

          return t
        }

        const cls = val()
        arr.push(cls)
      } else {
        const cls = `${command}-${value}`
        arr.push(cls)
      }

    })

    const classes = arr.join(" ")
    return classes
  }
}

/**@method tUtils TerseCSS Utils functions. */
export const tUtils = {
  com: tShs,
  media: tMedia,
  classname: tClassName,
  one: shOneLiner,
  oneOpt: shOneLinerOption,
  th: resTheme,
  scope
};
