import type { TerseTheme } from "./index"
import tShs from "./shs";
import { TOBJECT } from "./tobj";

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

/**@function resTheme TerseCSS theme resolver function. */
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
    transition: theme?.transition === undefined ? defaultTheme.transition === undefined ? ".1s all ease-in" : "" : theme.transition
  }

  return newTheme
}

function ROOT(theme:TerseTheme) {
  const rootVars = theme.vars !== undefined ? createVars(theme?.vars) : ""
  const root = theme?.root === undefined ? `:root{${defaultTheme.root}${rootVars}}` : `:root{${theme.root}${rootVars}}`
  return root
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
      return `w-${option} h-${more} d-flex flexd-column justify-${stackOpt}`;
    case "@hstack":
      return `w-${option} h-${more} flex flexd-row justify-${stackOpt}`;
    case "@center":
      return `center flexd-${option}`;
    case "@case":
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

//SCOPE ADD ON FOR *.CSS.TS USAGE
//turns each TOBJECT into terseCSS shorthand code
function machine(style: TOBJECT): string {
  if (typeof style === "object") {
     const keys = Object.keys(style)
    const values = Object.values(style)

    const arr: string[] = []
    const checkMedia = (c: string) => c === "sm" || c == "md" || c === "lg"
    const checkFirst = (c: string) => c.split("")[0] === "@"

  keys.forEach((command, index) => {
      const value = values[index]

      if (checkFirst(command)) {
        
        if (command === "@hover" || command === "@focus") {
          const val = () => {
              let t = ""
            const machineResult = machine(value)
            machineResult.split(" ").forEach(v => {
              const com = command.split("@")[1]
                t += `${com}:${v} `
              })

              return t
          }

          const cls = val()
          arr.push(cls)

        } else {
          const cls = `${command}:${value}`
          arr.push(cls)
        }
      
      } else if (checkMedia(command)) {
        const resclass = machine(value)
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
  } else {
    return style
  }
}

//get nodelist of the entire Document
function getNodeList() {
    const allElements = document.querySelectorAll("*");
    const classLists: TerseNode[] = [];

  allElements.forEach((element, id) => {
      if (element.classList && element.classList.length > 0) {
        classLists.push({
          tag: element.tagName?.toLocaleLowerCase(),
          classes: Array.from(element.classList).join(" "),
          element,
          id,
        });
      }
  });

    return classLists;
  }

/**@method tUtils TerseCSS Utils functions. */
export const tUtils = {
  com: tShs,
  media: tMedia,
  classname: tClassName,
  one: shOneLiner,
  oneOpt: shOneLinerOption,
  th: resTheme,
  machine,
  createVars,
  root: ROOT,
  getNodeList
};
