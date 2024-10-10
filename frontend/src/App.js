import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NavBar from "./components/NavBar";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path='/' element={user ? <HomePage /> : <Navigate to="/login" />} />
            <Route path='/login' element={user ? <Navigate to="/"/> : <Login />} />
            <Route path='/signup' element={user ? <Navigate to="/"/> : <Signup /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
