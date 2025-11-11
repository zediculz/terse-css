/* eslint-disable @typescript-eslint/no-unused-vars */

import Hi from "./assets/hi"
//import { tStyle, useSomeSome } from "../../src/index"
import style from "./style.css"

function App() {

  return (
    <div className={style.stack}>
      <button>click ME!</button>
      <Hi />
    </div>
  )
}

export default App
