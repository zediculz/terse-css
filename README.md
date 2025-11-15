
# TerseCSS A lightweight CSS-in-TS Framework with
- 🚀 Zero dependencies
- 🛑 Zero Runtime
- 🔌 Framework agnostic
- 🛠️ Full TypeScript type inference

## TerseCSS works seemlessly with *.css.ts can also be use directly in a component.

# TerseCSS is still very early in development

## Installation
```bash
npm i tersecss
```

### Usage
Create a *.css.ts file (eg style.css.ts) and export style to use
```javascript
import {
  //main top level functions
  terseCSS,

 //hook
  style,
} from "tersecss"

const wrap = style({
  width: "50%",
  height: "60%",
  cursor: "pointer",
  marginTop: "6rem",
  display: "flex",
  flexDirection: "column",
})

//use TerseCSS like this
function HelloWorld() => {
    return(
        <div className={wrap}>
            <h1>Hello World</h1>
        </div>
    )
}

//Or use main level function 
const mystyle = terseCSS.create({ wrap })

//use TerseCSS like this
function HelloWorld() => {
    return(
        <div className={mystyle.wrap}>
            <h1>Hello World</h1>
        </div>
    )
}

```

### TerseCSS use only css values.
# License

MIT © Ademujimi Oluwaseyi