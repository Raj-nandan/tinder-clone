import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import { useCookies } from 'react-cookie'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Home/> }/>
      {authToken && <Route path="/onboarding" element = {<Onboarding/>}/>}
      {authToken && <Route path="/dashboard" element = {<Dashboard/>}/>}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
