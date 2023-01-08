import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const IncomeTrip = ({ tripData }) => {
  const navigate = useNavigate();

  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      <img
        src="./img/hibiscus.png"
        alt="Bunga"
        style={{ top: -75 }}
        className="position-absolute end-0"
      />
      <img
        src="./img/palm.png"
        alt="Rumput"
        style={{ top: "30%" }}
        className="position-absolute start-0"
      />

      <Container>
        <div className="mt-3 d-flex justify-content-between">
          <h1>Group Tour</h1>
          <Button
            variant="warning"
            className="text-light fw-bold py-0 px-5 fs-5"
            onClick={() => {
              navigate("/addtrip");
            }}
          >
            Add Trip
          </Button>
        </div>
        <Row>
          {tripData.map((el, i) => {
            return (
              <Col lg={4} className="p-3" key={i}>
                <Card className="d-flex flex-column justify-content-center p-3">
                  <div id="img-group" className="position-relative">
                    <Card.Img
                      variant="top"
                      src={el.pict[0]}
                      className="img-fluid"
                    />
                    <div
                      style={{ width: 50, height: 30, top: 15 }}
                      className="bg-light position-absolute end-0 text-center d-flex flex-column justify-content-center rounded-start"
                    >
                      <p className="m-0 fw-bolder">{el.quota}</p>
                    </div>
                  </div>
                  <Card.Body className="p-0">
                    {/* <Link
                  to={"/detail"}
                  style={{ textDecoration: "none" }}
                  className="text-black"
                > */}
                    <Card.Title
                      onClick={() => {
                        navigate(`/detail/${el.tripId}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {el.title.length > 27
                        ? `${el.title.slice(0, 26)} . . .`
                        : el.title}
                    </Card.Title>
                    {/* </Link> */}
                    <div className="d-flex justify-content-between">
                      <p className="text-warning mb-0 fw-bolder">
                        Rp {el.price.toLocaleString()},-
                      </p>
                      <p className="text-secondary mb-0">{el.country}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </main>
  );
};

export default IncomeTrip;
