import { TerseTheme } from "./index";
import type { TObject, TOBJ } from "./utils";
import { util, defaultTheme } from "./utils";


class TerseCore {
  private styles: string[];
  private classlist: string[];
  private themes: TerseTheme;
  private sheet: CSSStyleSheet | null;

  constructor() {
    this.sheet = this.#DOM();
    this.classlist = [];
    this.themes = util.resTheme(defaultTheme);
    this.styles = [this.themes.root as string, this.#ASTERICKS()];
  }

  #DOM() {
    const shStyleElement = document.createElement("style");
    document.head.appendChild(shStyleElement);
    return shStyleElement.sheet;
  }

  #IMPORTFONT() {
    const importFontUrl = this.themes.fontUrl === undefined
      ? ""
      : this.themes.fontUrl;
    return `@import url(${importFontUrl});`;
  }

  #ASTERICKS() {
    const font = this.themes.font;
    const transition = this.themes.transition;
    return `*{margin:0;padding:0;font-family:${font};transition:${transition};}`;
  }

  #CLASSNAME() {
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

    const title = this.themes.title
    const r1 = alpha[Math.floor(Math.random() * 25)];
    const r2 = alpha[Math.floor(Math.random() * 25)];
    const r3 = alpha[Math.floor(Math.random() * 25)];
    const r4 = alpha[Math.floor(Math.random() * 25)];
    const r5 = alpha[Math.floor(Math.random() * 20)];
    const r6 = alpha[Math.floor(Math.random() * 15)];

    return `${title}_${r2}${r1}${r5}${r3}${r5}${r4}${r6}`;
  };

  #applyTheme(theme: TerseTheme) {
    this.themes = theme
    this.#ASTERICKS()
  }

  createTheme(theme:TerseTheme) {
    const THEME = util.resTheme(theme)
    this.#applyTheme(THEME)
  }

  AST(style: Partial<CSSStyleDeclaration> | TOBJ) {

    const keys = Object.keys(style)
    const values = Object.values(style)

    const cls = this.#CLASSNAME()
    let global = ""
    let media = ""
    let globalEffect = ""

    keys.forEach((key, id) => {
      const command = util.spliceCommand(key)
      const value = values[id]

      if (command[0] === ":") {
        const effect = util.spliceEffect(command)
        const val = util.spObj(value)
        const res = `&:${effect}{${val}}`
        globalEffect += res

      } else if (["sm", "md", "lg"].includes(command)) {
        const mediaRule = util.spMobj(value, util.media(command), cls)
        media += mediaRule
      } else {
        //GLOBAL
        const res = `${command}:${value};`
        global += res
      }
    })

    //console.log(global)
    //console.log(globalEffect)
    //console.log(media)

    const globalRule = `.${cls}{${global}${globalEffect}}`

    //EACH CSS RULE ADDED TO STYLES []
    const rule = globalRule !== "" ? globalRule : undefined;
    if (rule !== undefined) this.styles.push(rule);

    const mediaRulesArray = media
      .split("@media")
      .filter(Boolean)
      .map((rule) => `@media${rule}`);

    mediaRulesArray.forEach((mediaRule) => {
      this.styles.push(mediaRule);
    });

    this.#runTime()
    this.classlist.push(cls)
    return cls
  }

  #runTime() {
    //console.log(styles)
    this.styles.forEach((rule, id) => {
      this.sheet?.insertRule(rule, id);
    });
  }

  create(style: TObject) {
    //console.log(style)
    const keys = Object.keys(style)
    const values = Object.values(style)

    const result: Record<string, string> = {};
    keys.forEach((key, id) => {
      const value = values[id]
      result[key] = `${value}`;
    })

    return result;
  }
}

export default TerseCore