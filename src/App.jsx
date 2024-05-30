import { useState } from 'react'
import './App.css'
import QrCode from './Components/QrCode'
// import ProfileCard from './Components/ProfileCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <QrCode/>
    </>
  )
}

export default App
