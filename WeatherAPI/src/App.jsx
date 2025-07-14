import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className="text-3xl">Weather Forecast</h2>
      <h3 className="text-2xl bold">Islamabad</h3>
    </>
  )
}

export default App
