import { useRef } from "react";
import { Modal, Card, Row, Col, Alert, Image, Button } from "react-bootstrap";

const Approvement = ({
  showApprovement,
  setShowApprovement,
  currentOrder,
  tripData,
  userData,
  order,
  setOrder,
}) => {
  const trip = useRef(
    tripData?.filter((trip) => {
      return trip.tripId === currentOrder.tripId;
    })[0]
  );
  // console.log(trip);

  const user = useRef(
    userData?.filter((user) => {
      return user.userId === currentOrder.userId;
    })[0]
  );
  // console.log(user);

  const handleCancleOrder = () => {
    // mengambil nilai index dari order yang ingin diupdate
    let indexOfOrderData = order.findIndex(
      (ordr) => ordr.orderId === currentOrder.orderId
    );
    // console.log(indexOfOrderData);

    // menyalin data array order saat ini
    const newOrder = [...order];
    // mengupdate status & image order tersebut
    newOrder[indexOfOrderData].status = "cancel";
    newOrder[indexOfOrderData].img = "";

    // kirim data array order yang sudah diupdate ke state order
    setOrder(newOrder);
  };

  const handleApproveOrder = () => {
    // mengambil nilai index dari order yang ingin diupdate
    let indexOfOrderData = order.findIndex(
      (ordr) => ordr.orderId === currentOrder.orderId
    );
    // console.log(indexOfOrderData);

    // menyalin data array order saat ini
    const newOrder = [...order];
    // mengupdate status & image order tersebut
    newOrder[indexOfOrderData].status = "approve";

    // kirim data array order yang sudah diupdate ke state order
    setOrder(newOrder);
  };

  return (
    <Modal
      show={showApprovement}
      centered
      onHide={() => {
        setShowApprovement(false);
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
      dialogClassName="approvement-modals"
    >
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
            <div className="d-flex flex-column align-items-end w-75">
              <h1>Booking</h1>
              <h5 className="text-secondary">{currentOrder.bookingDate}</h5>
            </div>
          </Col>
        </Row>
        <Row className="px-4">
          <Col lg={5} className="d-flex flex-column justify-content-between">
            <div>
              <h2>{trip.current.title}</h2>
              <h5 className="text-secondary">{trip.current.country}</h5>
            </div>
            <div className="pb-5">
              {currentOrder.status === "new" && (
                <Alert variant="danger" className="d-inline-block p-1 px-3">
                  Waiting Payment
                </Alert>
              )}
              {currentOrder.status === "pending" && (
                <Alert variant="warning" className="d-inline-block p-1 px-3">
                  Waiting Approve
                </Alert>
              )}
              {currentOrder.status === "approve" && (
                <Alert variant="success" className="d-inline-block p-1 px-3">
                  Approve
                </Alert>
              )}
              {currentOrder.status === "cancel" && (
                <Alert variant="danger" className="d-inline-block p-1 px-3">
                  Payment receipt rejected
                </Alert>
              )}
            </div>
          </Col>
          <Col lg={4}>
            <Row g={0}>
              <Col lg={6} className="pb-5">
                <h4>Date Trip</h4>
                <h5 className="text-secondary">{trip.current.info.date}</h5>
              </Col>
              <Col lg={6} className="pb-5">
                <h4>Duration</h4>
                <h5 className="text-secondary">{trip.current.info.duration}</h5>
              </Col>
              <Col lg={6} className="pb-5">
                <h4>Accomodation</h4>
                <h5 className="text-secondary">
                  {trip.current.info.accomodation}
                </h5>
              </Col>
              <Col lg={6} className="pb-5">
                <h4>Transportation</h4>
                <h5 className="text-secondary">
                  {trip.current.info.transportation}
                </h5>
              </Col>
            </Row>
          </Col>
          <Col
            lg={3}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            {currentOrder.img === "" ? (
              // <Image
              //   src="img/receipt.png"
              //   alt="receipt"
              //   className="border border-dark border-3 w-75"
              // />
              <h4 className="text-center text-danger">
                The user hasn't uploaded an image yet
              </h4>
            ) : (
              <Image
                src="img/receipt.png"
                alt="receipt"
                className="border border-dark border-3 w-75"
              />
            )}
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
            <p className="my-0 text-muted">{user.current.fullname}</p>
          </Col>
          <Col lg={2}>
            <p className="my-0 text-muted">{user.current.gender}</p>
          </Col>
          <Col lg={2}>
            <p className="my-0 text-muted">{user.current.phone}</p>
          </Col>
          <Col lg={2} className="text-center fw-bold">
            <p className="my-0">Qty</p>
          </Col>
          <Col className="text-start ps-5 fw-bold">
            <p className="my-0">
              <span className="px-3 me-3">:</span>
              {currentOrder.qty}
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
          <Col lg={{ span: 2, offset: 7 }} className="text-center fw-bold">
            <p className="my-0">Total</p>
          </Col>
          <Col className="text-start ps-5 fw-bold">
            <p className="my-0 text-danger">
              <span className="px-3 me-3 text-black">:</span>IDR. &nbsp;
              {currentOrder.totalPrice.toLocaleString()}
            </p>
          </Col>
        </Row>
        {currentOrder.status === "pending" && (
          <div className={`d-flex justify-content-end mt-4`}>
            <Button
              variant="danger"
              className="text-white m-3 fs-5 fw-bold"
              style={{ width: 200 }}
              onClick={handleCancleOrder}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              className="text-white m-3 fs-5 fw-bold"
              style={{ width: 200 }}
              onClick={handleApproveOrder}
            >
              Approve
            </Button>
          </div>
        )}
      </Card>
    </Modal>
  );
};

export default Approvement;
