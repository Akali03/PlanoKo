import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import Profile from "./pages/Profile";

function App() {

  return (
 
      <Routes>
         <Route element={<PublicRoute />}>
           <Route path="/" element={<Landing />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
         <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />}/>
        </Route>
      </Routes>
  )
}

export default App
