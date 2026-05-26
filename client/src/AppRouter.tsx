import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kontakty from "./pages/Kontakty/Kontakty"
import './index.css'
import Menu from "./pages/Menu/Menu.tsx";
import Galerie from "./pages/Galerie/Galerie.tsx";
import AdminPanel from "./pages/AdminPanel/AdminPanel.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/kontakt" element={<Kontakty />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/galerie" element={<Galerie />}></Route>
            <Route path="/admin" element={<AdminPanel />}></Route>
        </Routes>
    </BrowserRouter>
  )
}
