///<reference lib="dom" />
import { defaultTheme, tUtils } from "./utils";
import type { Token, Node, ASTType } from "./utils";

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
  root?: string
}

/**@class TerseCSS */
class TerseCSS {
  private style: string[];
  private classlist: string[];
  private nodelist: Node[];
  private theme: TerseTheme;
  private sheet: CSSStyleSheet | null;

  constructor() {
    this.theme = defaultTheme;
    this.style = [this.theme.root as string, `*{margin:0;padding:0;}`];
    this.nodelist = [];
    this.classlist = [];
    this.sheet = this.#DOM();
  }

  #DOM() {
    const shStyleElement = document.createElement("style");
    document.head.appendChild(shStyleElement);
    const shSheet = shStyleElement.sheet;
    return shSheet;
  }

  /**@method #lexer terseCSS Lexer */
  #lexer(sh: string) {
    const tokens: Token[] = [];

    if (sh === "") {
      return tokens;
    } else {
      //shorthand are not empty

      const shStrArray = sh.split(" ");
      shStrArray.flatMap((shArray) => {
        const shSplit = shArray.split("-");

        if (shSplit.length === 1) {
          //One Line codes
          this.#lexer(tUtils.one(shArray)).flatMap((obj) => tokens.push(obj));
        } else {
          //All others
          const commandArray = shSplit[0];
          const valueArray = shSplit[1];

          const commands = commandArray.split(":");
          const values = valueArray.split(":");

          if (commands.length === 1) {
            //one command
            if (values.length === 1) {
              //one command one value
              const token: Token = {
                command: commands[0],
                value: values[0],
              };

              tokens.push(token);
            } else if (values.length === 2) {
              //one command, two values
              const valueOpt = isNaN(parseInt(values[1]))
                ? values.join("-")
                : values[0];
              tokens.push({
                command: commands[0],
                value: valueOpt,
                option: values[1]
              });
            }
          } else if (commands.length === 2) {
            const cOption = commands[0];
            //two commands
            if (cOption === "sm" || cOption === "md" || cOption === "lg" || cOption === "dark") {
              //responsive option
              if (values.length === 1) {
                //two command-Responsive option and one value
                const token: Token = {
                  command: commands[1],
                  value: values[0],
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
                  value: values[0],
                  effect: commands[0]
                });
              } else {
                //multiple value for effect option
                tokens.push({
                  command: commands[1],
                  value: values[0],
                  effect: commands[0]
              });
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
                value: values[0],
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

  /**@method #ast terseCSS AST */
  #ast(tks: Token[]) {
    const ast: ASTType[] = [];

    tks.flatMap((tk) => {
      if (tk.mediaType === undefined && tk.effect === undefined) {
        //Global ENV
        const command = tUtils.com(tk.command);
        const res = `${command}:${tk.value};`;

        const astToken: ASTType = {
          res,
          env: "global",
        };

        ast.push(astToken);
      } else if (tk.mediaType === undefined && tk.effect !== undefined) {
        //Global ENV effects
        const command = tUtils.com(tk.command);
        const res = `&:${tk.effect}{${command}:${tk.value};}`;

        const astToken: ASTType = {
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

        const astToken: ASTType = {
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
        const media = tUtils.media(tk.mediaType, defaultTheme);
        const res = `${command}:${tk.value};`;

        const astToken: ASTType = {
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

  /**@method #runtime terseCSS runtime */
  #runtime(node: Node) {
    let rules = "";
    let mediaRules = "";

    const tokens = this.#lexer(node?.classes);
    const ast: ASTType[] = this.#ast(tokens);

    //generating clasname for each nodes
    const className = tUtils.classname(node);

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

    const rule = rules !== "" ? `.${className}{${rules}}` : undefined;
    if (rule !== undefined) this.style.push(rule);

    const mediaRulesArray = mediaRules
      .split("@media")
      .filter(Boolean)
      .map((rule) => `@media${rule}`);

    mediaRulesArray.forEach((mediaRule) => {
      this.style.push(mediaRule);
    });

    this.style.forEach((rule, id) => {
      this.sheet?.insertRule(rule, id);
    });

    this.classlist.push(className);
    return className;
  }

  #getNodeList() {
    const allElements = document.querySelectorAll("*");
    const classLists: Node[] = [];

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
    this.nodelist = this.#getNodeList();

    //theme
    this.theme = tUtils.th(theme as TerseTheme);

    this.nodelist.flatMap((node) => {
      const classes = this.#runtime(node);
      node.element.classList.add(classes);
    });
  }

  /**@method start TerseCSS Entry Point.  @description call this function to init TerseCSS without worrying about theme. */
  start() {
    //nodelist
    this.nodelist = this.#getNodeList();

    this.nodelist.flatMap((node) => {
      const classes = this.#runtime(node);
      node.element.classList.add(classes);
    });
  }
}

/**@function createTheme TerseCSS custom theme creator */
export const createTheme = (customTheme: TerseTheme) => tUtils.th(customTheme);

//main
/**@instance of TerseCSS */
export const terseCSS = new TerseCSS();
export default TerseCSS;
