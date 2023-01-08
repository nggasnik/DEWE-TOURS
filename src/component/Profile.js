import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  // Alert,
  Form,
} from "react-bootstrap";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
// import { QRCodeSVG } from "qrcode.react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";

const Profile = () => {
  const [form, setForm] = useState({
    image: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmitImage = useMutation(async () => {
    try {
      // konfigurasi file
      // form data
      let formData = new FormData();
      formData.append("image", form.image[0]);

      // Insert trip data
      const response = await API.patch(`/user/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  let { id } = useParams();
  id = parseInt(id);
  console.log(id);

  let { data: users } = useQuery("userChache", async () => {
    const response = await API.get(`/user/${id}`);
    return response.data.data;
  });
  console.log(users);
  return (
    <>
      <main
        style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
        className="py-5 position-relative"
      >
        <Container>
          <Card className="w-75 mx-auto px-4 py-3">
            <Row>
              <Col lg={7}>
                <h1>Personal Info</h1>
                <div className="d-flex flex-column mt-4">
                  <div className="d-flex flex-row align-items-center my-1">
                    <IoPersonCircleSharp className="display-2 text-secondary me-3" />
                    <div>
                      <h5 className="m-0">{users?.fullName}</h5>
                      <p className="text-secondary m-0">Fullname</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center my-1">
                    <MdEmail className="display-2 text-secondary me-3" />
                    <div>
                      <h5 className="m-0">{users?.email}</h5>
                      <p className="text-secondary m-0">Email</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center my-1">
                    <MdPhone className="display-2 text-secondary me-3" />
                    <div>
                      <h5 className="m-0">{users?.phone}</h5>
                      <p className="text-secondary m-0">Mobile phone</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center my-1">
                    <MdLocationOn className="display-2 text-secondary me-3" />
                    <div>
                      <h5 className="m-0">{users?.address}</h5>
                      <p className="text-secondary m-0">Address</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={5} className="pt-3">
                <Form.Control
                  id="uploadImage"
                  type="file"
                  size="xs"
                  className="mt-5 d-none"
                  onChange={handleChange}
                />

                <Image src={users?.images} alt="profile" className="w-100" />
                {/* <Image
                  src="/img/profile-undefined.png"
                  alt="profile"
                  className="w-100"
                /> */}
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitImage.mutate(e);
                  }}
                >
                  <Button
                    variant="warning"
                    className="text-white w-100 my-2 fs-4"
                    onClick={handleSubmitImage}
                  >
                    Change Photo Profile
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>

          {/* <h1 className="mt-5">History</h1>
        {order.map((ordr) => {
          let trip = tripData?.filter((trip) => {
            return trip.tripId === ordr.tripId;
          })[0];
          console.log(trip);

          let user = userData?.filter((user) => {
            return user.userId === ordr.userId;
          })[0];
          console.log(user);

          return (
            ordr.userId === parseInt(localStorage.getItem("loginUser")) &&
            ordr.status === "approve" && (
              <Container className="mb-5" key={ordr.orderId}>
                <Card
                  className="bg-white py-3"
                  style={{ border: "2px solid rgba(108,117,125,0.7)" }}
                >
                  <Row className="px-3 pb-3">
                    <Col lg={4}>
                      <Image src="/img/payment-icon.png" alt="dewe-tour" />
                    </Col>
                    <Col
                      lg={{ span: 4, offset: 4 }}
                      className="d-flex justify-content-center ps-lg-4"
                    >
                      <div
                        className="d-flex flex-column align-items-end w-75"
                        style={{ width: "64%" }}
                      >
                        <h1>Booking</h1>
                        <h5 className="text-secondary">{ordr.bookingDate}</h5>
                      </div>
                    </Col>
                  </Row>
                  <Row className="px-4">
                    <Col
                      lg={5}
                      className="d-flex flex-column justify-content-between"
                    >
                      <div>
                        <h2>{trip.title}</h2>
                        <h5 className="text-secondary">{trip.country}</h5>
                      </div>
                      <div className="pb-5">
                        {ordr.status === "new" && (
                          <Alert
                            variant="danger"
                            className="d-inline-block p-1 px-3"
                          >
                            Waiting Payment
                          </Alert>
                        )}
                        {ordr.status === "pending" && (
                          <Alert
                            variant="warning"
                            className="d-inline-block p-1 px-3"
                          >
                            Waiting Approve
                          </Alert>
                        )}
                        {ordr.status === "approve" && (
                          <Alert
                            variant="success"
                            className="d-inline-block p-1 px-3"
                          >
                            Approve
                          </Alert>
                        )}
                        {ordr.status === "cancel" && (
                          <Alert
                            variant="danger"
                            className="d-inline-block p-1 px-3"
                          >
                            Payment receipt rejected
                          </Alert>
                        )}
                      </div>
                    </Col>
                    <Col lg={4}>
                      <Row g={0}>
                        <Col lg={6} className="pb-5">
                          <h4>Date Trip</h4>
                          <h5 className="text-secondary">{trip.info.date}</h5>
                        </Col>
                        <Col lg={6} className="pb-5">
                          <h4>Duration</h4>
                          <h5 className="text-secondary">
                            {trip.info.duration}
                          </h5>
                        </Col>
                        <Col lg={6} className="pb-5">
                          <h4>Accomodation</h4>
                          <h5 className="text-secondary">
                            {trip.info.accomodation}
                          </h5>
                        </Col>
                        <Col lg={6} className="pb-5">
                          <h4>Transportation</h4>
                          <h5 className="text-secondary">
                            {trip.info.transportation}
                          </h5>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg={3}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <Image
                        src={ordr.img}
                        alt="receipt"
                        className="border border-dark border-3 w-75"
                      />
                      <QRCodeSVG value={ordr.orderId} />,
                      <h1 className="mt-2">{ordr.orderId.toUpperCase()}</h1>
                    </Col>
                  </Row>
                  <Row className="fw-bold">
                    <Col lg={1} className="text-center">
                      <p className="my-0">No</p>
                    </Col>
                    <Col lg={2}>
                      <p className="my-0">FullName</p>
                    </Col>
                    <Col lg={2}>
                      <p className="my-0">Gender</p>
                    </Col>
                    <Col lg={2}>
                      <p className="my-0">Phone</p>
                    </Col>
                  </Row>
                  <hr
                    style={{
                      height: 3,
                      backgroundColor: "gray",
                      border: "none",
                      opacity: "25%",
                    }}
                  />
                  <Row>
                    <Col lg={1} className="text-center">
                      <p className="my-0 text-muted">1</p>
                    </Col>
                    <Col lg={2}>
                      <p className="my-0 text-muted">{user.fullname}</p>
                    </Col>
                    <Col lg={2}>
                      <p className="my-0 text-muted">{user.gender}</p>
                    </Col>
                    <Col lg={2}>
                      <p className="my-0 text-muted">{user.phone}</p>
                    </Col>
                    <Col lg={2} className="text-center fw-bold">
                      <p className="my-0">Qty</p>
                    </Col>
                    <Col className="text-start ps-5 fw-bold">
                      <p className="my-0">
                        <span className="px-3 me-3">:</span>
                        {ordr.qty}
                      </p>
                    </Col>
                  </Row>
                  <hr
                    style={{
                      height: 3,
                      backgroundColor: "gray",
                      border: "none",
                      opacity: "25%",
                    }}
                  />
                  <Row>
                    <Col
                      lg={{ span: 2, offset: 7 }}
                      className="text-center fw-bold"
                    >
                      <p className="my-0">Total</p>
                    </Col>
                    <Col className="text-start ps-5 fw-bold">
                      <p className="my-0 text-danger">
                        <span className="px-3 me-3 text-black">:</span>IDR.
                        &nbsp;
                        {ordr.totalPrice.toLocaleString()}
                      </p>
                    </Col>
                  </Row>
                </Card>
              </Container>
            )
          );
        })} */}
        </Container>
      </main>
    </>
  );
};

export default Profile;
