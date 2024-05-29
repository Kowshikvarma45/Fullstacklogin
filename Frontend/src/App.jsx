import {Routes,Route, BrowserRouter} from "react-router-dom"
import { Signup } from "./components/Signup"
import './App.css'
import { Login } from "./components/Login"
import { RecoilRoot } from "recoil"

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
    <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/Login" element={<Login />}></Route>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )
  
}

export default App
