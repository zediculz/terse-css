/* eslint-disable @typescript-eslint/no-unused-vars */
import style from "../style.css"
//import { tStyle, useStyleMachine } from "../../../src"

//const bg = tStyle("@sq: 50 % center: column jus - space: evenly text - center")

function Hi() {
    //const b = useStyleMachine(bg)

    return (
        <div className={style.wrap}>
            <img className={style.img} src="/img.png" alt="tersecss-logo" />
            <h2 className={style.h}>use CSS utility <b>classes</b> and <b>objects</b> with the power of <b className={style.b}>Finite-State Machine</b></h2>
            <p className={style.p}>Use utility Classes and Utility Objects to Write locally scoped classes, variables and themes, and generate <b className={style.b}>CSSDOM</b> at build time, all while leceraging on the power of finite-state machine.. </p>
            <span className={style.span}>npm i tersecss</span>
        </div>
    )
}

export default Hi