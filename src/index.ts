///<reference lib="dom" />

import { defaultTheme, tUtils } from "./utils";
import type { TerseToken, TerseNode, TerseAst, TerseVar, TObject } from "./utils";
import type { TOBJECT } from "./tobj";

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
  transition?: string
}

/**@class TerseCSS */
class TerseCSS {
  private styles: string[];
  private classlist: string[];
  private themes: TerseTheme;
  private sheet: CSSStyleSheet | null;

  constructor() {
    //create theme first, load CSSDOM, init the classlist and style []
    this.themes = tUtils.th(defaultTheme);
    this.sheet = this.#DOM();
    this.classlist = [];
    this.styles = [this.themes.root as string, this.#ASTERICKS()];
  }

  #DOM() {
    const shStyleElement = document.createElement("style");
    document.head.appendChild(shStyleElement);
    return shStyleElement.sheet;
  }

  #ASTERICKS(withimport:boolean = false) {
    const fontFamily = this.themes.font
    const transition = this.themes.transition
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
              const varValue = this.themes.vars?.filter(v => v.name === varCheck)[0]?.value
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
      const varValue = this.themes.vars?.filter(v => v.name === vars)[0]
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
        const media = tUtils.media(tk.mediaType, this.themes);
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
    if (theme !== undefined) this.themes = theme

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

    this.classlist.push(className);
    return className;
  }

  //Global and HTMLNODE Entry Point
  //this use utility class first
  /**@method startGlobalCSS generate global style using the utility class provided on HTML NODES. @param theme provide a custom Tersetheme or use the default  @description globalStyle is one of the way TerseCSS can be used, globalStyle make use of Utility Class which are expected to be provided on each HTML, globalStyle works with the HTML NODE of your App, all the utility class will be automatically converter to a CSSDOM. */
  startGlobalCSS(theme?: TerseTheme) {
    //nodelist
    const nodelists = tUtils.getNodeList();

    //theme
    this.applyTheme(theme)

    nodelists.forEach((el) => {
      //console.log(el.classes)
      const classes = this.#runtime(el, theme);
      if (el.element) {
        el.element.classList.add(classes);
      }
    });
  }

  applyTheme(theme?: TerseTheme) {
   this.themes = theme === undefined ? defaultTheme : theme as TerseTheme
  }

  //SCOPED and Utility Objects Entry Point
  //this use utility object first
  /**@method scopeStyle generate scoped style using the utility object. @param nodes NodeList  @description scopeStyle. */
  scopedRuntime(nodes: TerseNode[]) {
    const scopeNodes: { tag: string | undefined; classname: string; }[] = []
    nodes.forEach((el) => {
      const classname = this.#runtime(el);
      
      if (el.tag) {
        scopeNodes.push({ tag: el.tag, classname })
      }
    });

    return scopeNodes
  }
}

///////////////////////////////////////////////////////////////////
//HOOKS FOR *css.ts files
//ADD ONS FOR TERSECSS ON REACT LIKE AND CLASSNAME GENERATION
//scpedRuntime Core
/**@function useStyleMachine(style) */
function scopeRuntimeCore(style: TObject) {
  //console.log(style)
  const nodes: TerseNode[] = []
  const keys = Object.keys(style)
  const values = Object.values(style)

  keys.forEach((tag, id) => {
    const obj = values[id]
    const classes = tUtils.machine(obj as TOBJECT)
    const node: TerseNode = { id, tag, classes }
    nodes.push(node)
  })
 
  const classes = terseCSS.scopedRuntime(nodes)
  const obj: Record<string, string> = {}
  classes.forEach(({ tag, classname }) => {
    if (tag) {
      obj[tag] = `${classname}`
    }
  })
  return obj
}


//Scoped Runtime hook
/**@function tStyleMachine(style) create scope CSS in *.css.ts file for your App. */
export const tStyleMachine = (style: TObject) => {
  return scopeRuntimeCore(style)
}

/**@function tStyle(style) TerseCSS utility object creator */
export const tStyle = (style: TOBJECT) => {
  console.log(tUtils.machine(style))
  return style as TOBJECT
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
export default TerseCSS;

//USE GLOBALCSS TO CREATE A GLOBAL CSSDOM STYLED WITH UTULITY CLASS 
//USE SCOPED CSS TO CREATE SCOPED CSSDOM WITH UTILITY OBJECTS