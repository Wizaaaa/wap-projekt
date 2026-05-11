import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kontakty from "./pages/Kontakty"
import './index.css'
import Menu from "./pages/menu";

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/kontakt" element={<Kontakty />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
        </Routes>
    </BrowserRouter>
  )
}
