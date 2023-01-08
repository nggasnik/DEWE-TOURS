import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useMutation } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export let DataPayment = {
  trip_id:0,
  title: "",
  counterQty: 0,
  total: 0,
  days: 0,
  nights: 0,
  transport:"",
  accomodation:"",
  country_name:"",
  Date:"",

}
export let DataUser = {
  id:0,
  fullName:"",
  phone:"",
  gender:"",
   
}
const DetailTrip = () => {
  DataUser.id= localStorage.getItem("id")
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [price ] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    setTotalPrice(price * qty);
    DataPayment.counterQty = qty
  }, [price, qty]);

  let {id} = useParams()
  id = parseInt(id)
  let {data: detailT} = useQuery('detailTourCache', async () => {
    const response = await API.get(`/trip/${id}`)
    DataPayment.trip_id = detailT?.id
    DataPayment.title = detailT?.title
    DataPayment.total = detailT?.price * qty
  DataPayment.days = detailT?.day
  DataPayment.nights = detailT?.night
  DataPayment.transport = detailT?.transportation
  DataPayment.accomodation = detailT?.accomodation
  DataPayment.country_name = detailT?.country.name
  DataPayment.Date = detailT?.dateTrip
  
    return response.data.data

  })

  let {data: detailUser} = useQuery('detailUserCache', async () => {
    const response = await API.get(`/user/${DataUser.id}`)
    DataUser.fullName = detailUser?.fullName
    DataUser.phone = detailUser?.phone
  
    return response.data.data

  })

  // const detail = useParams()
  // eslint-disable-next-line no-unused-vars
  const [state] = useContext(UserContext);
 
  // const data = {
  //   counterQty: qty,
  //   total : totalPrice,
  //   status :  "waiting",
  //   tripId :  1,
  //   attachment : "",
  //   userId : state?.user.Id
  // }
 
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      
      navigate(`/payment`)
    } catch (error) {
      console.log(error);
    }
  });



  return (
    <>
  
    <NavBar/>
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      <img
        src="/img/hibiscus.png"
        alt="Bunga"
        style={{ top: -75 }}
        className="position-absolute end-0"
      />
      <img
        src="/img/palm.png"
        alt="Rumput"
        style={{ top: "30%" }}
        className="position-absolute start-0"
      />
      
            <Container >
              <h1 className="display-4 fw-bold">{detailT?.title}</h1>
              <h3 className="text-secondary">{detailT?.country.name}</h3>
              <Row>
                <Col xs={12} className="py-2">
                  <img
                    src={detailT?.images[0]}
                    alt="Card 1"
                    className="img-fluid w-100 rounded"
                    style={{ height: 500, objectFit: "cover" }}
                  />
                </Col>
                <Col lg={4} className="py-2">
                  <img
                    src={detailT?.images[0]}
                    alt="Card 2"
                    className="img-fluid w-100 rounded"
                    style={{ height: 250, objectFit: "cover" }}
                  />
                </Col>
                <Col lg={4} className="py-2">
                  <img
                    src={detailT?.images[0]}
                    alt="Card 3"
                    className="img-fluid w-100 rounded"
                    style={{ height: 250, objectFit: "cover" }}
                  />
                </Col>
                <Col lg={4} className="py-2">
                  <div className="position-relative">
                    <img
                      src={detailT?.images[0]}
                      alt="Card 4"
                      className="img-fluid w-100 rounded"
                      style={{ height: 250, objectFit: "cover" }}
                    />
                    <div
                      className={`position-absolute top-0 w-100 h-100 text-white d-flex justify-content-center align-items-center ${
                        detailT?.images.length <= 4 && "d-none"
                      }`}
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                    >
                      <h1>+{detailT?.images.length - 4}</h1>
                    </div>
                  </div>
                </Col>
              </Row>

              <h4 className="mt-5">Information Trip</h4>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <small className="text-secondary">Accomodation</small>
                  <h4 className="d-flex align-items-end">
                    <img
                      src="/img/hotel.png"
                      alt=""
                      className="img-fluid me-2"
                    />
                    {detailT?.accomodation}
                  </h4>
                </div>
                <div>
                  <small className="text-secondary">Transportation</small>
                  <h4 className="d-flex align-items-end">
                    <img
                      src="/img/plane.png"
                      alt=""
                      className="img-fluid me-2"
                    />
                    {detailT
                    ?.transportation}
                  </h4>
                </div>
                <div>
                  <small className="text-secondary">Eat</small>
                  <h4 className="d-flex align-items-end">
                    <img
                      src="/img/meal.png"
                      alt=""
                      className="img-fluid me-2"
                    />
                    {detailT?.eat}
                  </h4>
                </div>
                <div>
                  <small className="text-secondary">Duration</small>
                  <h4 className="d-flex align-items-end">
                    <img
                      src="/img/time.png"
                      alt=""
                      className="img-fluid me-2"
                    />
                    {detailT?.day}D/{detailT?.night}N
                  </h4>
                </div>
                <div>
                  <small className="text-secondary">Date Trip</small>
                  <h4 className="d-flex align-items-end">
                    <img
                      src="/img/calendar.png"
                      alt=""
                      className="img-fluid me-2"
                    />
                    {detailT?.dateTrip}
                  </h4>
                </div>
              </div>

              <h4 className="mt-5">Description</h4>
              <p style={{ textAlign: "justify" }}>{detailT?.description}</p>

              <div className="d-flex justify-content-between mt-5">
                <div>
                  <h1 className="d-inline-block text-warning">
                    IDR. {detailT?.price}
                  </h1>
                  <h1 className="d-inline-block text-black">&nbsp;/ Person</h1>
                </div>
                <div
                  id="qty"
                  className="d-flex justify-content-center align-items-center"
                >
                  <Button
                    variant="warning"
                    className="text-white rounded-4 fs-3 d-flex flex-column p-2"
                    onClick={() => {
                      setQty((prevState) => {
                        return prevState > 1 ? prevState - 1 : 1;
                      });
                    }}
                  >
                    <BsDashLg />
                  </Button>
                  <h1
                    className="d-inline-block text-center"
                    style={{ width: 150 }}
                  >
                    {qty}
                  </h1>
                  <Button
                    variant="warning"
                    className="text-white rounded-4 fs-3 d-flex flex-column p-2"
                    onClick={() => {
                      setQty((prevState) => {
                        return prevState + 1;
                      });
                    }}
                  >
                    <BsPlusLg />
                  </Button>
                </div>
              </div>

              <hr className="text-secondary" />
              <div className="d-flex justify-content-between">
                <div>
                  <h1 className="d-inline-block text-black fw-bold">Total :</h1>
                </div>
                <div>
                  <h1 className="d-inline-block text-warning fw-bold">
                    IDR. {detailT?.price * qty}
                  </h1>
                </div>
              </div>
              <hr className="text-secondary" />
              <div className="d-flex justify-content-end">
                <Button
                  variant="warning"
                  className="text-white fs-3 fw-bolder rounded-3 px-5"
                  onClick={(e) => { handleSubmit.mutate(e) }}

                >
                  BOOK NOW
                </Button>
              </div>
            </Container>
    </main>
    <Footer />  
    </>
  );
};

export default DetailTrip;
