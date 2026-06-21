import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {

  return (
 
      <Routes>
         <Route element={<PublicRoute />}>
           <Route path="/" element={<Landing />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
      </Routes>
  )
}

export default App
