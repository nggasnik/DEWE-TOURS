import { Container, Table, Modal, Image } from "react-bootstrap";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { useState } from "react";
import Approvement from "./Approvement";
import { useQuery } from "react-query";
import { API } from "../config/api";

const ListTransaction = () => {
  const [showApprovement, setShowApprovement] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [currentImgUrl, setCurrentImgUrl] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);

  let {data: trans} = useQuery('transactionCacheB', async () => {
    const response = await API.get('/orders')
    return response.data.data
  })
  console.log(trans)


  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      {currentOrder && (
        <Approvement
          showApprovement={showApprovement}
          setShowApprovement={setShowApprovement}
          currentOrder={currentOrder}
          // userData={userData}
          // tripData={tripData}
          // order={order}
          // setOrder={setOrder}
        />
      )}
  
      {/* image modals */}
      <Modal
        show={showImg}
        centered
        onHide={() => {
          setShowImg(false);
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
        dialogClassName="image-modals"
      >
        <Image src={currentImgUrl} />
      </Modal>

      <Container>
        <h1>Incoming Transaction</h1>
        <Table striped className="bg-light mt-4">
          <thead>
            <tr>
              <th className="py-3 text-center">Id Trx</th>
              <th className="py-3 text-center">Users</th>
              <th className="py-3 text-center">Trip</th>
              <th className="py-3 text-center">Bukti Transfer</th>
              <th className="py-3 text-center">Status Payment</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {trans?.map((ordr,index) => {
              return (
                <tr key={index}>
                  <td>{ordr?.id}</td>
                  <td>
                    {
                     ordr?.user.fullName
                    }
                  </td>
                  <td>
                    {
                      ordr?.trip.title
                    }
                  </td>
                  <td className="text-center">
                    {ordr.img ? (
                      <p
                        onClick={() => {
                          setCurrentImgUrl(ordr.img);
                          setShowImg(true);
                        }}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                        }}
                      >
                        see image
                      </p>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td
                    className={`text-center fw-bold 
                    ${ordr?.status === "new" && "text-secondary"}
                    ${ordr?.status === "pending" && "text-warning"}
                    ${ordr?.status === "approve" && "text-success"}
                    ${ordr?.status === "cancel" && "text-danger"}
                    `}
                  >
                    {ordr?.status}
                  </td>
                  <td className="text-center">
                    <HiMagnifyingGlassCircle
                      className="fs-2 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentOrder(ordr);
                        setShowApprovement(true);
                      }}
                      

                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default ListTransaction;
