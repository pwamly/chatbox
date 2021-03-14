import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const style = {
  display: "flex",
  flexDirection: "row",
};
const stylemain = {
  padding: "20px",
  borderRadius: "16px",
  margin: "auto",

  width: "800px",
  transition: "0.3s",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.4)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.4)",
  },
};

function CgnCylinderInfoCont({ formData, setForm, navigation }) {
  const {
    servicepressure1,
    cmanufacturedDate1,
    waterVolume1,
    expiryDate1,
    tbscertificate1,
    servicepressure2,
    cmanufacturedDate2,
    waterVolume2,
    expiryDate2,
    tbscertificate2,
    servicepressure3,
    cmanufacturedDate3,
    waterVolume3,
    expiryDate3,
    tbscertificate3,
  } = formData;

  async function handle() {
    let responsecode = "1234";
    if (responsecode) {
      navigation.next();
    }
  }

  return (
    <Container>
      <Card style={stylemain}>
        <h3> CNG CYLINDERS INFORMATION Cont ... </h3>{" "}
        <Card fullWidth style={style}>
          <Card>
            <TextField
              label="Service Pressure(MPa)"
              value={servicepressure1}
              onChange={setForm}
              name="servicepressure1"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              label="Manufactured Date"
              value={cmanufacturedDate1}
              onChange={setForm}
              name="cmanufacturedDate1"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              label="Water volume(litres)"
              value={waterVolume1}
              onChange={setForm}
              name="waterVolume1"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              label="Expiry Date"
              value={expiryDate1}
              onChange={setForm}
              name="expiryDate1"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              label="TBS certificare"
              value={tbscertificate1}
              onChange={setForm}
              name="tbscertificate1"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
          </Card>{" "}
          <Card>
            <TextField
              label="Service Pressure(MPa)"
              value={servicepressure2}
              onChange={setForm}
              name="servicepressure2"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              label="Manufactured Date"
              value={cmanufacturedDate2}
              onChange={setForm}
              name="cmanufacturedDate2"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              label="Water volume(litres)"
              value={waterVolume2}
              onChange={setForm}
              name="waterVolume2"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              label="Expiry Date"
              value={expiryDate2}
              onChange={setForm}
              name="expiryDate2"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              label="TBS certificare"
              value={tbscertificate2}
              onChange={setForm}
              name="tbscertificate2"
              margin="normal"
              variant="outlined"
              autoComplete="off"
            />
          </Card>{" "}
          <Card>
            <TextField
              label="Service Pressure(MPa)"
              value={servicepressure3}
              onChange={setForm}
              name="servicepressure3"
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="Manufactured Date"
              value={cmanufacturedDate3}
              onChange={setForm}
              name="cmanufacturedDate3"
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="Water volume(litres)"
              value={waterVolume3}
              onChange={setForm}
              name="waterVolume3"
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="Expiry Date"
              value={expiryDate3}
              onChange={setForm}
              name="expiryDate3"
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="TBS certificare"
              value={tbscertificate3}
              onChange={setForm}
              name="tbscertificate3"
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
          </Card>{" "}
        </Card>{" "}
        <div style={{ marginTop: "1rem" }}>
          {" "}
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2px" }}
            onClick={() => navigation.previous()}
          >
            Back{" "}
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "1rem" }}
            onClick={() => navigation.next()}
          >
            Next{" "}
          </Button>{" "}
        </div>{" "}
      </Card>{" "}
    </Container>
  );
}

export default CgnCylinderInfoCont;