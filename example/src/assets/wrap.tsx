/* eslint-disable @typescript-eslint/no-unused-vars */
import mystyle from "../style.css"

function Wrap() {
   
    return (
        <div className={mystyle.wrap}>
            <div className={mystyle.st}>
                <img src="/img.png" alt="tersecss-logo" className={mystyle.img} />
            </div>
            <div className={mystyle.stack}>
                <h2 className={mystyle.h}>Zero RunTime CSS-in-TS, style in TS and generate CSSDOM in build time.</h2>
                <p className={mystyle.p}>Use utility Classes and Utility Objects to Write locally scoped classes, variables and themes, and generate <b>CSSDOM</b> at build time, all while leceraging on the power of finite-state machine.. </p>
                <div className={mystyle.div}>
                    <span className={mystyle.span}> npm i tersecss</span>
                    <button className={mystyle.btn}>Read Doc</button>
                </div>
            </div>
        </div>
    )
}

export default Wrap