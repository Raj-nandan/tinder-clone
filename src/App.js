import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Home/> }/>
      <Route path="/onboarding" element = {<Onboarding/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
