import { Button, Modal, Form } from "react-bootstrap";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { useState } from "react";

const Register = ({
  registerForm,
  setRegisterForm,
  setLoginForm,
  userData,
  setUserData,
}) => {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
    // image: "",
    role: "user",

})

const handleOnChange = (e) => {
    setForm({
        ...form,
        [e.target.name]:
           e.target.value
    })
}

const handleSubmit = useMutation(async (e) => {
    try {
        e.preventDefault()

        let formData = new FormData()
        formData.set('fullName', form.fullName)
        formData.set('email', form.email)
        formData.set('password', form.password)
        formData.set('phone', form.phone)
        formData.set('address', form.address)
        formData.set('gender', form.gender)
        formData.set('role', form.role)

        console.log(form);
        const response = await API.post('/register', form)
        console.log(response);


    } catch (error) {
        console.log(error);
    }
})

  

  return (
    <Modal
      show={registerForm}
      centered
      onHide={() => {
        setRegisterForm(false);
      }}
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100vh",
        // backgroundColor: "rgba(255,255,255,0.5)",
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
      <Modal.Title className="display-5 fw-bold mx-auto p-4">
        Register
      </Modal.Title>

      <Form className="p-4" onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className="mb-3" controlId="formFullname">
          <Form.Label className="h3 fw-bolder">Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            onChange={handleOnChange}
          />
   
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="h3 fw-bolder">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="h3 fw-bolder">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label className="h3 fw-bolder">Gender</Form.Label>
          <Form.Select
            name="gender"
            onChange={handleOnChange}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label className="h3 fw-bolder">Phone</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            placeholder="Enter Your Phone Number"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label className="h3 fw-bolder">Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            placeholder="Enter Your Address"
            style={{ height: "100px" }}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          className="w-100 text-white fs-4 fw-bolder"
        >
          Register
        </Button>
      </Form>
    </Modal>
  );
};

export default Register;
