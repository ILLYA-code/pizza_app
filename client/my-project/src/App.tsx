// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import TestComp from './components/TestComp'

function App() {

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-500">
      {/* <h1 className="text-white text-4xl">Hello, Tailwind CSS!</h1> */}
      {/* <button>Click Me!</button> */}
      <TestComp />
    </div>
  )
}

export default App
