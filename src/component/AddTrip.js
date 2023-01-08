import { useState } from "react";
import { Container, Form, Button, Row, Col} from "react-bootstrap";
import { MdAttachFile } from "react-icons/md";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import Swal from "sweetalert2";

const AddTrip = () => {
  // const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const [preview, setPreview] = useState(null);

  // buat usestate untuk menampung data sementara
  const [form, setForm] = useState({
    title: "",
    id_country: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    dateTrip: "",
    price: "",
    quota: "",
    description: "",
    images: "",
  });

  // state error
  const [error, setError] = useState({
    title: "",
    id_country: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    datetrip: "",
    price: "",
    quota: "",
    description: "",
    images: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value, // jika type file maka  form isi file, jika value maka isi value
    });

    // buat url image
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // handle submit
  const handleSubmit = useMutation(async (e) => {
    console.log("laginyobaupload");
    try {
      const config = {
          headers: {
          'Content-type': 'multipart/form-data',
          },
      };
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("id_country", form.id_country);
      formData.append("accomodation", form.accomodation);
      formData.append("transportation", form.transportation);
      formData.append("eat", form.eat);
      formData.append("day", form.day);
      formData.append("night", form.night);
      formData.append("dateTrip", "2 January 2006");
      formData.append("price", form.price);
      formData.append("quota", form.quota);
      formData.append("description", form.description);
      formData.append("images", form.images[0]);


      // Insert trip data
      const response = await API.post(`/trip`, formData, config);
      Swal.fire({
        text: "Trip successfully added",
        icon: "success",
        confirmButtonText: "Ok",
      });
      console.log(response);

      const messageError = {
        title: "",
        countryId: "",
        accomodation: "",
        transportation: "",
        eat: "",
        day: "",
        night: "",
        datetrip: "",
        price: "",
        quota: "",
        description: "",
        image: "",
      };

      // validasi form title
      if (form.title === "") {
        messageError.title = "Title must be filled out";
      } else {
        messageError.title = "";
      }

      // validasi form country
      if (form.countryId === "") {
        messageError.countryId = "Country must be filled out";
      } else {
        messageError.countryId = "";
      }

      // validasi form accomodation
      if (form.accomodation === "") {
        messageError.accomodation = "Accomodation must be filled out";
      } else {
        messageError.accomodation = "";
      }

      // validasi form transportation
      if (form.transportation === "") {
        messageError.transportation = "Transportation must be filled out";
      } else {
        messageError.transportation = "";
      }

      // validasi form eat
      if (form.eat === "") {
        messageError.eat = "Eat must be filled out";
      } else {
        messageError.eat = "";
      }

      // validasi form day
      if (form.day === "") {
        messageError.day = "Day must be filled out";
      } else if (parseInt(form.day) < 1) {
        messageError.day = "can't be less than 1";
      } else {
        messageError.day = "";
      }

      // validasi form night
      if (form.night === "") {
        messageError.night = "Day must be filled out";
      } else if (parseInt(form.night) < 1) {
        messageError.night = "can't be less than 1";
      } else {
        messageError.night = "";
      }

      // validasi form date trip
      if (form.datetrip === "") {
        messageError.datetrip = "Date must be filled out";
      } else {
        messageError.datetrip = "";
      }

      // validasi form price
      if (form.price === "") {
        messageError.price = "Price must be filled out";
      } else if (form.price < 0) {
        messageError.price = "can't be less than 0";
      } else {
        messageError.price = "";
      }

      // validasi form quota
      if (form.quota === "") {
        messageError.quota = "Quota must be filled out";
      } else if (parseInt(form.quota) < 1) {
        messageError.quota = "can't be less than 1";
      } else {
        messageError.quota = "";
      }

      // validasi form date description
      if (form.description === "") {
        messageError.description = "Description must be filled out";
      } else {
        messageError.description = "";
      }

      // validasi form date image
      if (form.image === "") {
        messageError.image = "Image must be fil3000led out";
      } else {
        messageError.image = "";
      }

      if (
        // jika semua message error kosong
        messageError.title === "" &&
        messageError.countryId === "" &&
        messageError.accomodation === "" &&
        messageError.transportation === "" &&
        messageError.eat === "" &&
        messageError.day === "" &&
        messageError.night === "" &&
        messageError.datetrip === "" &&
        messageError.price === "" &&
        messageError.quota === "" &&
        messageError.description === "" &&
        messageError.image === ""
      ) {
        // form add data trip
      } else {
        setError(messageError);
      }
    } catch (err) {
      console.log(err);
    }
  });

  // get countries
  let { data: country } = useQuery("userCache", async () => {
    const response = await API.get(`/country`);
    return response.data.data;
  });

  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      <Container>
        <h1>Add Trip</h1>
        <Form
          className="p-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit.mutate(e);
          }}
        >
          {/* title trip */}
          <Form.Group className="mb-4" controlId="formTitle">
            <Form.Label className="h3 fw-bolder">Title Trip</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title Trip"
              onChange={handleChange}
              // value={form.title}
            />
            {error.title && (
              <Form.Text className="text-danger">{error.title}</Form.Text>
            )}
          </Form.Group>

          {/* country */}
          <Form.Group className="mb-4" controlId="formCountry">
            <Form.Label className="h3 fw-bolder">Country</Form.Label>
            <Form.Select name="id_country" onChange={handleChange}>
              {country?.map((country) => (
                <option
                  key={country.id}
                  // value={country.id}
                  onChange={handleChange}
                >
                  {country.name}
                </option>
              ))}
            </Form.Select>
            {error.country && (
              <Form.Text className="text-danger">{error.country}</Form.Text>
            )}
          </Form.Group>

          {/* accomodation */}
          <Form.Group className="mb-4" controlId="formAccomodation">
            <Form.Label className="h3 fw-bolder">Accomodation</Form.Label>
            <Form.Control
              type="text"
              name="accomodation"
              placeholder="Enter Accomodation"
              // value={form.accomodation}
              onChange={handleChange}
            />
            {error.accomodation && (
              <Form.Text className="text-danger">
                {error.accomodation}
              </Form.Text>
            )}
          </Form.Group>

          {/* transportation */}
          <Form.Group className="mb-4" controlId="formTransportation">
            <Form.Label className="h3 fw-bolder">Transportation</Form.Label>
            <Form.Control
              type="text"
              name="transportation"
              placeholder="Enter Transportation"
              onChange={handleChange}
              // value={form.transportation}
            />
            {error.transportation && (
              <Form.Text className="text-danger">
                {error.transportation}
              </Form.Text>
            )}
          </Form.Group>

          {/* eat */}
          <Form.Group className="mb-4" controlId="formEat">
            <Form.Label className="h3 fw-bolder">Eat</Form.Label>
            <Form.Control
              type="text"
              name="eat"
              placeholder="Enter Eat"
              onChange={handleChange}
              // value={form.eat}
            />
            {error.eat && (
              <Form.Text className="text-danger">{error.eat}</Form.Text>
            )}
          </Form.Group>

          <Form.Label className="h3 fw-bolder">Duration</Form.Label>
          <Row className="mb-4">
            <Col lg={4}>
              <Form.Group className="d-flex flex-row" controlId="formDay">
                <Form.Control
                  type="number"
                  name="day"
                  placeholder="Enter Day"
                  className="w-50 me-3"
                  onChange={handleChange}
                  // value={form.day}
                />
                <Form.Label className="h3 fw-bolder">Day</Form.Label>
              </Form.Group>
              {error.day && (
                <Form.Text className="text-danger">{error.day}</Form.Text>
              )}
            </Col>
            <Col lg={4}>
              <Form.Group className="d-flex flex-row" controlId="formNight">
                <Form.Control
                  type="number"
                  name="night"
                  placeholder="Enter Night"
                  className="w-50 me-3"
                  onChange={handleChange}
                  // value={form.night}
                />
                <Form.Label className="h3 fw-bolder">Night</Form.Label>
              </Form.Group>
              {error.night && (
                <Form.Text className="text-danger">{error.night}</Form.Text>
              )}
            </Col>
          </Row>

          {/* date */}
          <Form.Group className="mb-4" controlId="formDate">
            <Form.Label className="h3 fw-bolder">Date</Form.Label>
            <Form.Control
              type="date"
              name="dateTrip"
              placeholder="Enter Date"
              onChange={handleChange}
            />
            {error.date && (
              <Form.Text className="text-danger">{error.date}</Form.Text>
            )}
          </Form.Group>

          {/* price */}
          <Form.Group className="mb-4" controlId="formPrice">
            <Form.Label className="h3 fw-bolder">Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter Price"
              onChange={handleChange}
              // value={form.price}
            />
            {error.price && (
              <Form.Text className="text-danger">{error.price}</Form.Text>
            )}
          </Form.Group>

          {/* quota */}
          <Form.Group className="mb-4" controlId="formQuota">
            <Form.Label className="h3 fw-bolder">Quota</Form.Label>
            <Form.Control
              type="number"
              name="quota"
              placeholder="Enter Quota"
              onChange={handleChange}
              // value={form.quota}
            />
            {error.quota && (
              <Form.Text className="text-danger">{error.quota}</Form.Text>
            )}
          </Form.Group>

          {/* desc */}
          <Form.Group className="mb-4" controlId="formDescription">
            <Form.Label className="h3 fw-bolder">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter Trip Description"
              style={{ height: "100px" }}
              onChange={handleChange}
              // value={form.description}
            />
            {error.desc && (
              <Form.Text className="text-danger">{error.desc}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="h3 fw-bolder">Image</Form.Label>
            {error.img && (
              <Form.Text className="text-danger d-block">{error.img}</Form.Text>
            )}
            <Form.Control
              type="file"
              name="images"
              id="img-addtrip"
              size="lg"
              className="d-none"
              multiple
              onChange={handleChange}
            />
          </Form.Group>
          <div
            className="py-2 px-2 text-warning fs-5 fw-bold border border-2 rounded-3 d-flex justify-content-between align-items-center d-inline-block"
            style={{
              backgroundColor: "whitesmoke",
              cursor: "pointer",
              width: "25%",
            }}
            onClick={() => {
              document.getElementById("img-addtrip").click();
            }}
          >
            <p className="p-0 m-0">Add Attachment Here</p>
            <MdAttachFile className="" />
          </div>
          {/* )} */}

          <Form.Group className="mb-3" controlId="formFullname">
            <Form.Label className="h3 fw-bolder">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              placeholder="Enter Full Name"
              onChange={handleChange}
            />
            {error.fullname && (
              <Form.Text className="text-danger">{error.fullname}</Form.Text>
            )}
          </Form.Group>

          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="warning"
              type="submit"
              className="px-5 text-white fs-5 fw-bolder"
            >
              Add Trip
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default AddTrip;
