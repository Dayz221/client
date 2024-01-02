import { LoginPage } from "./pages/login.jsx";
import { RegisterPage } from "./pages/register.jsx";
import { MainPage } from './pages/main.jsx'
import { Routes, Route, Navigate } from "react-router-dom";
import './styles/App.css'

function App() {

  return (
    <div id="App">
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
