import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kontakty from "./pages/Kontakty"
import './index.css'

export default function AppRouter() {
  return (
    <HashRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/kontakt" element={<Kontakty />}></Route>
        </Routes>
    </HashRouter>
  )
}
