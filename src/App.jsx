import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import SimpleBottomNavigation from "./components/MainNav";
//import MainNav from './components/MainNav'
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import { Container } from "@mui/material";


function App() {
  
  return (

    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending/>} exact />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/search" element={<Search/>} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  )
}

export default App
