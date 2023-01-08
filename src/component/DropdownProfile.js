import { Col, Dropdown, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoListOrdered } from "react-icons/go";
import { FaFlagCheckered, FaMoneyBill, FaRoute } from "react-icons/fa";
import { TbFileDollar, TbLogout } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const DropdownProfile = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
        type: "LOGOUT"
    })
    navigate("/auth")
}
  
  

  const [state, dispatch] = useContext(UserContext);

  return (
    <Dropdown className="position-relative" autoClose>
      <Dropdown.Toggle
        style={{ backgroundColor: "transparent", border: "none" }}
        id="dropdown-profile"
      >
       {props.children}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ marginLeft: -85, marginTop: 10, width: 150 }}>
        <Image
          src="/img/dropdown-polygon.png"
          className="position-absolute"
          style={{ top: -12, right: 15, width: 20 }}
        />
        {state.user.role === "admin" ? (
          <Row>
            <Col lg={12}>
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/addcountry");
                  let drtoggle = document.getElementById("dropdown-profile");
                  drtoggle.click();
                }}
              >
                <FaFlagCheckered className="me-3 fs-3 text-warning" />
                <h5 className="m-0">Add Country</h5>
              </div>
            </Col>
            <Col lg={12}>
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/addtrip");
                  let drtoggle = document.getElementById("dropdown-profile");
                  drtoggle.click();
                }}
              >
                <FaRoute className="me-3 fs-3 text-success" />
                <h5 className="m-0">Trip</h5>
              </div>
            </Col>
            <Col lg={12}>
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/listtrx");
                  let drtoggle = document.getElementById("dropdown-profile");
                  drtoggle.click();
                }}
              >
                <FaMoneyBill className="me-3 fs-3 text-success" />
                <h5 className="m-0">Income Trans</h5>
              </div>
            </Col>
            <Col lg={12}>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "gray",
                  border: "none",
                  opacity: "25%",
                }}
              />
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("isLogin");
                  localStorage.removeItem("loginUser");
                  navigate("/");
                }}
              >
                <TbLogout className="me-3 fs-3 text-danger" />
                <h5 className="m-0" onClick={logout}>Logout</h5>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={12}>
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/profile/id");
                  let drtoggle = document.getElementById("dropdown-profile");
                  drtoggle.click();
                }}
              >
                <BsPersonCircle className="me-3 fs-3 text-warning" />
                <h5 className="m-0">Profile</h5>
              </div>
            </Col>
            <Col lg={12}>
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/payment");
                  let drtoggle = document.getElementById("dropdown-profile");
                  drtoggle.click();
                }}
              >
                <TbFileDollar className="me-3 fs-3 text-success" />
                <h5 className="m-0">Pay</h5>
              </div>
            </Col>
            <Col lg={12}>
              <hr
                style={{
                  height: 2,
                  backgroundColor: "gray",
                  border: "none",
                  opacity: "25%",
                }}
              />
              <div
                className="px-3 py-2 d-flex flex-row justify-content-start align-items-center dropdown-profile-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("isLogin");
                  localStorage.removeItem("loginUser");
                  navigate("/");
                }}
              >
                <TbLogout className="me-3 fs-3 text-danger" />
                <h5 className="m-0" onClick={logout}>Logout</h5>
              </div>
            </Col>
          </Row>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownProfile;
