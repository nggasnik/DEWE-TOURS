import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
//   Alert,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Form,
  Modal,
} from "react-bootstrap";
import { BiImageAdd } from "react-icons/bi";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../context/UserContext";
import { DataPayment } from "./DetailTrip";
import { DataUser } from "./DetailTrip";
import { useEffect } from "react";

const Payment = () => {

const MasSuryaGanteng = useMutation (async (DataPayment) => {
    try {
      const tai = {
        counterQty : DataPayment.counterQty,
        total : DataPayment.total,
        trip_id : DataPayment.trip_id,
      }
    

      const config = {
        method:"POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      };
    
      let formData = new FormData();
      formData.append("counterQty", tai.counterQty);
      formData.append("total", tai.total);
      formData.append("trip_id", tai.trip_id);

      const response = await API.post("/transaction", formData , config);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          // history.push("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          // history.push("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

    } catch (error) {
    }
  })

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-HDurK2AT6SL7kktl";

    let scriptTag = document.createElement("script")
    scriptTag.src = midtransScriptUrl

    scriptTag.setAttribute("data-client-key", myMidtransClientKey)
    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])
//   const [img, setImg] = useState("");
  const [popup, setPopup] = useState(false);

  let id = useParams()
  const navigate = useNavigate();
  let {data: payment} = useQuery("paymentCache", async () => {
    const response = await API.get(`/trip/${id.id}`)
    return response.data.data
  })

//   NGAMBIL TRX
    // const [state] = useContext(UserContext);

    // let {data : trx} = useQuery("transactionCache", async () => {
    //     const response = await API.get(`/transaction}`)
    //     return response.data.data
    // })


  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      <Modal
        show={popup}
        centered
        backdrop="static"
        onHide={() => {
          setPopup(false);
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
        <Modal.Body>
          <p className="text-center">
            Your payment will be confirmed within 2 x 24 hours
          </p>
          <p className="text-center">
            To see orders click{" "}
            <u
              className="fw-bold text-underline"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/payment");
                setPopup(false);
              }}
            >
              Here
            </u>{" "}
            thank you
          </p>
        </Modal.Body>
      </Modal>

        
            <Container className="mb-5" >
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
                    >
                      <h1>Booking</h1>
                      <h5 className="text-secondary">{payment?.date}</h5>
                    </div>
                  </Col>
                </Row>
                <Row className="px-4">
                  <Col
                    lg={5}
                    className="d-flex flex-column justify-content-between"
                  >
                    <div>
                      <h2>{DataPayment?.title}</h2>
                      <h5 className="text-secondary">{DataPayment?.country_name}</h5>
                    </div>
                    
                  </Col>
                  <Col lg={4}>
                    <Row g={0}>
                      <Col lg={6} className="pb-5">
                        <h4>Date Trip</h4>
                        <h5 className="text-secondary">{DataPayment?.Date}</h5>
                      </Col>
                      <Col lg={6} className="pb-5">
                        <h4>Duration</h4>
                        <h5 className="text-secondary">{DataPayment?.days} Days {DataPayment?.nights} Nights</h5>
                      </Col>
                      <Col lg={6} className="pb-5">
                        <h4>Accomodation</h4>
                        <h5 className="text-secondary">
                          {DataPayment?.accomodation}
                        </h5>
                      </Col>
                      <Col lg={6} className="pb-5">
                        <h4>Transportation</h4>
                        <h5 className="text-secondary">
                          {DataPayment?.transport}
                        </h5>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    lg={3}
                    className="d-flex flex-column align-items-center justify-content-center"
                  >
                    <Form.Control
                    //   id={payment.id}
                      type="file"
                      size="xs"
                    //   name={payment.id}
                      className="mt-5 d-none"
                    //   onChange={handleUploadImage}
                    />
                
                      <Image
                        alt="receipt"
                        className="border border-dark border-3 w-75"
                      />
                      <Image
                        alt="receipt"
                        className="border border-dark border-3 w-75"
                      />
                      <BiImageAdd
                        style={{ cursor: "pointer" }}
                      
                        className="display-1"
                      />
                    <small className="text-secondary mt-2">
                      Upload payment proof
                    </small>
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
                    <p className="my-0 text-muted">{DataUser?.fullName}</p>
                  </Col>
                  <Col lg={2}>
                    <p className="my-0 text-muted">male</p>
                  </Col>
                  <Col lg={2}>
                    <p className="my-0 text-muted">{DataUser?.phone}</p>
                  </Col>
                  <Col lg={2} className="text-center fw-bold">
                    <p className="my-0">Qty</p>
                  </Col>
                  <Col className="text-start ps-5 fw-bold">
                    <p className="my-0">
                      <span className="px-3 me-3">:</span>
                     {DataPayment?.counterQty}
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
                      <span className="px-3 me-3 text-black">:</span>IDR. &nbsp;
                     {DataPayment.total}
                    </p>
                  </Col>
                </Row>
              </Card>
              <div
                className="d-flex justify-content-end"
              >
                <Button
                  variant="warning"
                  className="text-white m-3 fs-5 fw-bold"
                  style={{ width: 200 }}
                onClick={()=> MasSuryaGanteng.mutate(DataPayment)}
                >
                  PAY
                </Button>
              </div>
            </Container>
        </main>
      
  );
};

export default Payment;
