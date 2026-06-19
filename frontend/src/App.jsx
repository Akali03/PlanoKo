import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import './App.css'

function App() {

  return (
 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}/>
        </Route>
      </Routes>
  )
}

export default App
