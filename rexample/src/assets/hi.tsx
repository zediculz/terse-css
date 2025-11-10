/* eslint-disable @typescript-eslint/no-unused-vars */
import style from "../style.css"
import { tStyle, useStyleMachine } from "../../../src"

const bg = tStyle({
    bg: "pink"
})

function Hi() {
    const b = useStyleMachine(bg)

    return (
        <div className={style.hi}>
            <img className={style.img} src="/img.png" alt="tersecss-logo" />
            <h2 className={style.h1}>use CSS utility <b>classes</b> and <b>objects</b> with the power of <b className={style.b}>Finite-State Machine</b></h2>
            <p className={style.p}>Use utility Classes and Utility Objects to Write locally scoped classes, variables and themes, and generate <b className={style.b}>CSSDOM</b> at build time, all while leceraging on the power of finite-state machine.. </p>
            <span className={b.bg}>npm i tersecss</span>
        </div>
    )
}

export default Hi