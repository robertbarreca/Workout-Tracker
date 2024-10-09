import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
