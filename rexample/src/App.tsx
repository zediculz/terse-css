import { useStyleMachine, tObject } from "../../src/index"

const wrap = tObject({
  color: "red",
  md: { color: "green" },
  sm: {
    color: "blue"
  }
})

function App() {
  const style = useStyleMachine({ wrap: wrap })
  console.log(style)

  return (
    <h1 className={style.wrap}>Hello world!</h1>
  )
}

export default App
