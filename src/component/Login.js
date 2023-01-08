import { Button, Modal, Form } from "react-bootstrap";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const Login = ({ loginForm, setLoginForm, setRegisterForm }) => {

const [state, dispatch] = useContext(UserContext)
const [formLogin, setFormLogin] = useState({
  email: "",
  password: "",
});
const handleChange = (e) => {
  setFormLogin({
    ...formLogin,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await API.post("/login", formLogin, config);
    // console.log(response);

    if (response.status === 200)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
       
      })
    

  } catch (error) {
    console.log(error);
  }
});





  return (
    <Modal
      show={loginForm}
      centered
      onHide={() => {
        setLoginForm(false);
      }}
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      className="rounded-0"
    >
      <img
        src="/img/hibiscus-modals.png"
        alt="Bunga"
        className="position-absolute top-0 end-0 rounded-top"
      />
      <img
        src="/img/palm-modals.png"
        alt="Rumput"
        className="position-absolute top-0 start-0 rounded-top"
      />
      <Modal.Title className="display-5 fw-bold mx-auto p-4">Login</Modal.Title>

      <Form className="p-4"  onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="h3 fw-bolder">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="h3 fw-bolder">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          className="w-100 text-white fs-4 fw-bolder"
          onClick={() => {
            setLoginForm(false);
          }
        }

        >
          Login
        </Button>
        <p className="text-muted fs-6 my-3 mx-auto text-center pt-3">
          Don't have an account? ? Klik{" "}
          <b
            style={{ cursor: "pointer" }}
            onClick={() => {
              setLoginForm(false);
              setRegisterForm(true);
            }}
          >
            Here
          </b>
        </p>
      </Form>
    </Modal>
  );
};

export default Login;
