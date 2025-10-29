
/**@function tShs All TerseCSS css shorthand commands and its utility functions. */
const tShs = (command: string) => {
  switch (command) {
    //layouts
    case "h":
      return "height";
    case "w":
      return "width";
    case "maxw":
      return "max-width";
    case "maxh":
      return "max-height";
    case "minw":
      return "min-width";
    case "minh":
      return "min-height";
    case "d":
      return "display";
    case "dis":
      return "display";
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

    //flex
    case "flexd":
      return "flex-direction";
    case "align":
      return "align-items";
    case "alignc":
      return "align-content";
    case "justify":
      return "justify-content";
    case "justifyi":
      return "justify-items";
    case "flexw":
      return "flex-wrap";
    case "flexf":
      return "flex-flow";

    //grid
    case "gtc":
      return "grid-template-columns";
    case "gtr":
      return "grid-template-rows";
    case "gta":
      return "grid-template-area";
    case "gap":
      return "grid-gap";

    //text
    case "font":
      return "font-size";
    case "fontw":
      return "font-weight";
    case "fonts":
      return "font-style";
    case "fontf":
      return "font-family";
    case "text":
      return "text-align";
    case "textd":
      return "text-decoration";
    case "textt":
      return "text-transform";
    case "color":
      return "color";
    case "line":
      return "line-height";
    case "letter":
      return "letter-spacing";
    case "word":
      return "word-spacing";


    //background
    case "bg":
      return "background";
    case "bgc":
      return "background-color";
    case "bgi":
      return "background-image";
    case "bgr":
      return "background-repeat";
    case "bgp":
      return "background-position";
    case "bgs":
      return "background-size";

    //border
    case "bd":
      return "border";
    case "bdw":
      return "border-width";
    case "bds":
      return "border-style";
    case "bdc":
      return "border-color";
    case "bdr":
      return "border-radius";

    //effects
    case "cur":
      return "cursor";
    case "op":
      return "opacity";
    case "boxs":
      return "box-shadow";
    case "bs":
      return "box-shadow";
    case "filter":
      return "filter";
    case "rt":
      return "rotate";
    case "scale":
      return "scale";
    case "sc":
      return "scale";
    case "trsl":
      return "translate";
    case "trans":
      return "transition";
    case "ani":
      return "animation";
    case "out":
      return "outline";
    
    //self codes
    case "space":
      return "margin-top"

    default:
      return command;
  }
};

export default tShs