import { Container, Nav, Navbar, Button, Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import DropdownProfile from "./DropdownProfile";
import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";


const NavBar = ({ setLoginForm, setRegisterForm, userData }) => {
  const [currentUserImg, setCurrentUserImg] = useState("");




  const [state, dispatch ] = useContext(UserContext)
  // console.log(state)



  const location = useLocation();
  // console.log(location.pathname);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className={`position-absolute top-0 w-100 ${
        location.pathname === "/" && "bg-transparent"
      }`}
      style={
        location.pathname !== "/"
          ? {
              height: 100,
              zIndex: 2,
              backgroundImage: `url(${"/img/bg-navbar.png"})`,
              backgroundSize: "cover",
            }
          : {
              height: 100,
              zIndex: 2,
            }
      }
    >
      {location.pathname !== "/" && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        ></div>
      )}
      <Container style={{ zIndex: 3 }}>
        <Link
          to="/"
          className={`navbar-brand`}
          style={{ textDecoration: "none" }}
        >
          <img src="/img/Icon.png" alt="Dewe Tour" />
        </Link>
        <Nav className="ms-auto">
          {!state.isLogin ? (
            <>
              <Button
                variant="outline-light"
                className="mx-2"
                style={{ width: 150 }}
                onClick={() => {
                  setLoginForm(true);
                }}
              >
                Login
              </Button>
              <Button
                variant="warning"
                className="text-white mx-2"
                style={{ width: 150 }}
                onClick={() => {
                  setRegisterForm(true);
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <DropdownProfile userData={userData}>
              {currentUserImg !== "" ? (
                <Image
                  src={currentUserImg}
                  style={{ width: 75 }}
                  className="border border-warning"
                  roundedCircle
                />
              ) : (
                <Image
                  src="/img/agent.png"
                  style={{ width: 75 }}
                  className="border border-warning"
                  roundedCircle
                />
              )}
              {/* <Image
                src="/img/agent.png"
                style={{ width: 75 }}
                className="border border-warning"
                roundedCircle
              /> */}
            </DropdownProfile>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
