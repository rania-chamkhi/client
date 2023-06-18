import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./views/Layout";
import DetailsVeh from "./views/vehicule/DetailsVeh";
import reservationService from "./service/reservationService";
import Login from "./views/login";
import Reservation from "./views/reservation/pageReserv";
import Register from "./views/register";
import Profil from "./views/profil";
import Contact from "./components/contact";
import Header from "./components/header";
import Footer from "./components/footer";
import UpdateReserv from "./views/reservation/updateReserv";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Layout />}></Route>
            <Route path="/DetailsVehicule/:id" element={<DetailsVeh />}></Route>
            <Route path="/Pagereserv/:id" element={<Reservation />}></Route>
            <Route path="/UpdateReserv/:id" element={<UpdateReserv />}></Route>

          </Route>
          <Route path="/Login/:callback?" element={<Login /> }></Route>
          <Route path="/profil" element={<Profil />}></Route>
          <Route
            path="/contact/:id/:type"
            element={
              <>
                <Header hideSlider={true} /> <Contact /> <Footer />
              </>
            }
          ></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
