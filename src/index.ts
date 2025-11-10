///<reference lib="dom" />
import { defaultTheme, tUtils } from "./utils";
import type { TerseToken, TerseNode, TerseAst, TerseVar, TObject, TOBJECT } from "./utils";

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
  fontFamily?: string,
  transition?: string
}

/**@class TerseCSS */
class TerseCSS {
  private styles: string[];
  private classlists: string[];
  private theme: TerseTheme;
  private sheet: CSSStyleSheet | null;

  constructor() {
    this.theme = tUtils.th(defaultTheme);
    this.sheet = this.#DOM();
    this.classlists = [];
    this.styles = [this.theme.root as string, this.#ASTERICKS()];
  }

  #DOM() {
    const shStyleElement = document.createElement("style");
    document.head.appendChild(shStyleElement);
    return shStyleElement.sheet;
  }

  #ASTERICKS() {
    const fontFamily = this.theme.fontFamily
    const transition = this.theme.transition
    return `*{margin:0;padding:0;font-family:${fontFamily};transition:${transition};}`
  }

  /**@method #lexer terseCSS Lexer @param sh shorthand commands */
  #lexer(sh: string) {
    const tokens: TerseToken[] = [];

    if (sh === "") {
      return tokens;
    } else {
      //shorthand are not empty
      const shStrArray = sh.split(" ");
      shStrArray.flatMap((shArray) => {
        const shSplit = shArray.split("-");

        if (shSplit.length === 1) {
          //One Line codes
          //one line commands
          const shArraySplit = shArray.split(":")

          const _vars = shArraySplit[1] !== undefined ? shArraySplit[1].split("var")[1] : shArraySplit[1]
          const varCheck = _vars !== undefined ? _vars.split("(")[1]?.split(")")[0] : _vars
          const command = tUtils.com(shArraySplit[0])

          if (shArraySplit.length === 1) {
            this.#lexer(tUtils.one(shArray)).flatMap((obj) => tokens.push(obj));
          } else {

            if (varCheck !== undefined && command) {
              const varValue = this.theme.vars?.filter(v => v.name === varCheck)[0]?.value
              const token: TerseToken = {
                command,
                value: varValue as string,
              };

              tokens.push(token);
            } else {
              this.#lexer(tUtils.oneOpt(shArraySplit)).flatMap((obj) => tokens.push(obj));
            }

          }
        } else {
          //commands and value shorthands
          //All other shorthand commands
          const commandArray = shSplit[0];
          const valueArray = shSplit[1];

          const commands = commandArray.split(":");
          const values = valueArray.split(":");

          if (commands.length === 1) {
            //one command
            if (values.length === 1) {
              //one command and one value
              const token: TerseToken = {
                command: commands[0],
                value: this.#varRes(values[0]) as string,
              };

              tokens.push(token);
            } else if (values.length === 2) {
              //one command, two values
              const valueOpt = isNaN(parseInt(values[1])) ? values.join("-") : values[0];

              const token = {
                command: commands[0],
                value: this.#varRes(valueOpt) as string,
                option: values[1]
              }

              tokens.push(token);
            }
          } else if (commands.length === 2) {
            const cOption = commands[0];
            //two commands
            if (cOption === "sm" || cOption === "md" || cOption === "lg" || cOption === "dark") {
              //responsive option
              if (values.length === 1) {
                //two command-Responsive option and one value
                const token: TerseToken = {
                  command: commands[1],
                  value: this.#varRes(values[0]) as string,
                  mediaType: cOption,
                };

                tokens.push(token);
              } else if (values.length === 2) {
                //two commands, two values
                //console.log("here", values, commands)
              }
            } else if (cOption === "hover") {
              //effect option
              if (values.length === 1) {
                //one value for effect
                tokens.push({
                  command: commands[1],
                  value: this.#varRes(values[0]) as string,
                  effect: commands[0]
                });
              } else {
                //multiple value for effect option
                tokens.push({
                  command: commands[1],
                  value: this.#varRes(values[0]) as string,
                  effect: commands[0]
                });

                //console.log(commands[1], values[0], commands[0])
              }
            }
          } else if (commands.length === 3) {
            //three commands
            const mediaType = commands[0];
            const effect = commands[1];
            const command = commands[2];

            if (values.length === 1) {
              tokens.push({
                command,
                value: this.#varRes(values[0]) as string,
                effect,
                mediaType,
              });
            }
          }
        }
      });

      //console.log(tokens)
      return tokens;
    }
  }

  #varRes(value: string) {
    const varSplit = value.split("var")
    if (varSplit.length === 1) {
      return value
    } else if (varSplit[1] !== undefined) {
      const vars = varSplit[1].split("(")[1].split(")")[0]
      const varValue = this.theme.vars?.filter(v => v.name === vars)[0]
      return varValue?.value
    }
  }

  /**@method #ast terseCSS shorthand AST */
  #ast(tks: TerseToken[]) {
    const ast: TerseAst[] = [];

    tks.flatMap((tk) => {
      if (tk.mediaType === undefined && tk.effect === undefined) {
        //Global ENV
        const command = tUtils.com(tk.command);
        const res = `${command}:${tk.value};`;

        const astToken: TerseAst = {
          res,
          env: "global",
        };

        ast.push(astToken);
      } else if (tk.mediaType === undefined && tk.effect !== undefined) {
        //Global ENV effects
        const command = tUtils.com(tk.command);
        const res = `&:${tk.effect}{${command}:${tk.value};}`;

        const astToken: TerseAst = {
          res,
          effect: tk.effect,
          env: "effect",
        };

        ast.push(astToken);
      } else if (tk.mediaType !== undefined && tk.effect !== undefined) {
        //"responsive and effect"

        const command = tUtils.com(tk.command);
        const media = tUtils.media(tk.mediaType, defaultTheme);
        const res = `&:${tk.effect}{${command}:${tk.value};}`;

        const astToken: TerseAst = {
          res,
          media,
          mediaType: tk.mediaType,
          effect: tk.effect,
          env: "mediaEffect",
        };

        ast.push(astToken);
      } else if (tk.mediaType !== undefined && tk.effect === undefined) {
        //"all responsive"
        const command = tUtils.com(tk.command);
        const media = tUtils.media(tk.mediaType, this.theme);
        const res = `${command}:${tk.value};`;

        const astToken: TerseAst = {
          res,
          media,
          mediaType: tk.mediaType,
          env: "media",
        };

        ast.push(astToken);
      }
    });

    return ast;
  }

  /**@method #runtime terseCSS utility-classes runtime */
  #runtime(elements: TerseNode, theme?: TerseTheme) {
    let rules = "";
    let mediaRules = "";

    //apply theme if available on runtime 
    //to create cope theme and or alway use of theme in scope call
    if (theme !== undefined) this.theme = theme

    const tokens = this.#lexer(elements?.classes);
    const ast: TerseAst[] = this.#ast(tokens);

    //console.log(tokens)
    //console.log(ast)
    //generating clasname for each nodes
    const className: string = tUtils.classname(elements);

    //MAIN RUNTIME CSS RULES
    ast.flatMap((tk) => {
      if (tk.env === "global") {
        //global rules
        rules += `${tk.res}`;
      } else if (tk.env === "effect") {
        //global-effect rules
        rules += `${tk.res}`;
      } else if (tk.env === "media") {
        //media rules
        mediaRules += `${tk.media}{.${className}{${tk.res}}}`;
      } else if (tk.env === "mediaEffect") {
        //media-effect rules
        mediaRules += `${tk.media}{.${className}{${tk.res}}}`;
      }
    });

    //EACH CSS RULE ADDED TO STYLES []
    const rule = rules !== "" ? `.${className}{${rules}}` : undefined;
    if (rule !== undefined) this.styles.push(rule);

    const mediaRulesArray = mediaRules
      .split("@media")
      .filter(Boolean)
      .map((rule) => `@media${rule}`);

    mediaRulesArray.forEach((mediaRule) => {
      this.styles.push(mediaRule);
    });

    this.styles.forEach((rule, id) => {
      this.sheet?.insertRule(rule, id);
    });

    this.classlists.push(className);
    return className;
  }

  #getNodeList() {
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

  //entry point
  /**@method init TerseCSS Entry Point. @param theme provide a custom Tersetheme or use the default  @description make sure to call this function. */
  init(theme?: TerseTheme) {
    //nodelist
    const nodelists = this.#getNodeList();

    //theme
    this.theme = theme as TerseTheme

    nodelists.flatMap((el) => {
      //console.log(el.classes)
      const classes = this.#runtime(el, theme);
      if (el.element) {
        el.element.classList.add(classes);
      }
    });
  }

  /**@method start TerseCSS Entry Point.  @description call this function to init TerseCSS without worrying about theme. */
  start() {
    //nodelist
    const nodelists = this.#getNodeList();

    nodelists.flatMap((el) => {
      const classes = this.#runtime(el);
      if (el.element) {
        el.element.classList.add(classes);
      }
    });
  }

  scopeStyle(nodes: TerseNode[]) {
    const scpeNodes: { tag: string | undefined; cls: string; }[] = []
    nodes.forEach((el) => {
      const cls = this.#runtime(el);
      if (el.tag) {
        scpeNodes.push({ tag: el.tag, cls })
      }
    });

    return scpeNodes
  }
}



//ADD ONS FOR TERSECSS ON REACT LIKE AND CLASSNAME GENERATION
/**@function useStyleMachine(style) */
export function useStyleMachine(style: TObject) {
  const keys = Object.keys(style)
  const values = Object.values(style)
  const nodes: TerseNode[] = []

  keys.forEach((tag, id) => {
    const path = location.pathname === "/" ? "" : location.pathname.split("/")[1]
    const exTag = path === "" ? tag : `${path}_${tag}`
    const obj = values[id]

    const classes = tUtils.scope(obj as TOBJECT)
    const node: TerseNode = { id, tag: exTag, classes }
    nodes.push(node)
  })

  const cls = terseCSS.scopeStyle(nodes)

  const obj: Record<string, string> = {}

  cls.forEach(({ tag, cls }) => {
    if (tag) {
      obj[tag] = `${cls}`
    }
  })
  return obj
}

//TYPE-SAFETY Hooks
/**@function createTheme(theme) TerseCSS custom theme creator */
export const createTheme = (customTheme: TerseTheme) => tUtils.th(customTheme);

/**@function tObject(style) TerseCSS utility object creator */
export const tObject = (style: TOBJECT) => style;

//main
/**@instance of TerseCSS */
export const terseCSS = new TerseCSS();
export default TerseCSS;
