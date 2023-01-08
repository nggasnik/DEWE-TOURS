import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useEffect, useContext } from "react";
import { API, setAuthToken } from "./config/api";
import DetailTrip from "./component/DetailTrip";
import Profile from "./component/Profile";
import { UserPrivateRoute } from "./component/UserPrivateRoute";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
import Footer from "./component/Footer";
import AddTrip from "./component/AddTrip";
import LoginPayment from "./component/Payment";
import AddCountry from "./component/AddCountry";
import AdminPrivateRoute from "./component/AdminPrivateRoute";
import ListTransaction from "./component/ListTransaction";




if (localStorage.token) {
  setAuthToken(localStorage.token); 
}
function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<DetailTrip />} />

          {/* USER */}
          <Route element={<UserPrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<DetailTrip />} />
            <Route exac path="/payment" element={<LoginPayment />} />
            <Route exact path="/profile/:id" element={<Profile />} />
          </Route>

          {/* ADMIN */}
          <Route element={<AdminPrivateRoute />}>
            <Route exact path="/addtrip" element={<AddTrip />} />
            <Route exact path="/addcountry" element={<AddCountry />} />
            <Route exact path="/listtrx" element={<ListTransaction />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
