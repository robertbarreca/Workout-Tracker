import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<HomePage /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
