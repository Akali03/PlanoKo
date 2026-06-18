import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import './App.css'

function App() {

  return (
 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />}/>
      </Routes>
  )
}

export default App
