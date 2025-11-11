
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