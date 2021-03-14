import React, { useRef, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { useToasts } from "react-toast-notifications";
import TextField from "@material-ui/core/TextField";
import Spinner from "../../Spinner/Spiner";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
const spinerStyle = {
  display: "flex",
  flexDirection: "rows",
  gap: "12px",
};

function Regteam() {
  const style = { display: "flex", flexDirection: "row", fontWeight: "bold" };
  const [cng, setCng] = useState("");
  const [open, setOpen] = React.useState(false);
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const formref = useRef();
  const fsname = useRef("");
  const lsname = useRef("");
  const usrphone = useRef("");
  const email = useRef("");
  const signature = useRef("");
  const pass = useRef("");

  const handleChange = (event) => {
    setCng(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  async function handlesave() {
    console.log(
      fsname.current.value,
      lsname.current.value,
      usrphone.current.value,
      email.current.value,
      cng,
      pass.current.value
    );
    window.location.replace("/dashboard/team");
    try {
      setLoading(true);
      // formref.current.reset();
      let response;
      //   const response = await postProfile({
      //     firstname: fsname.current.value,
      //     lastname: lsname.current.value,
      //     phone: usrphone.current.value,
      //   });

      if (response) {
        setLoading(false);
        addToast("... was Updated successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        window.location.replace(`/dashboard`);
        return;
      }
      setLoading(false);
      addToast("Updates saved!", { appearance: "warning" });
    } catch (error) {
      setLoading(false);
      addToast("Failed", { appearance: "error" });
    }
  }

  return (
    <Card
      variant="outlined "
      style={{
        marginTop: "10px",
        position: "absolute",
        left: "50%",
        top: "50%",
        fontFamily: "sans-serif",
        transform: "translate(-50%, -50%)",
        width: "35%",
        minWidth: "300px",
        zIndex: "1",
        height: "auto",
        borderRadius: "16px",
        marginBottom: "20px !important",
        maxWidth: 300,
        padding: "20px",
        borderRadius: "16px",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.4)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.4)",
        },
      }}
    >
      {" "}
      <TextField
        label="First Name "
        margin="normal"
        inputRef={fsname}
        variant="outlined"
        autoComplete="off"
        fullWidth
        ref={formref}
      />{" "}
      <TextField
        label="Last Name "
        margin="normal"
        inputRef={lsname}
        variant="outlined"
        autoComplete="off"
        fullWidth
        ref={formref}
      />{" "}
      <TextField
        label="Phone"
        margin="normal"
        inputRef={usrphone}
        variant="outlined"
        autoComplete="off"
        fullWidth
        ref={formref}
      />{" "}
      <TextField
        label="Email"
        margin="normal"
        inputRef={email}
        variant="outlined"
        autoComplete="off"
        fullWidth
        ref={formref}
      />{" "}
      <TextField
        label="Password"
        margin="normal"
        inputRef={pass}
        variant="outlined"
        autoComplete="off"
        fullWidth
        ref={formref}
      />{" "}
      <InputLabel id="label">CNG-FSI</InputLabel>
      <Select
        labelId="label"
        id="select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={cng}
        onChange={handleChange}
        ref={formref}
      >
        <MenuItem value="majengo">Majengo</MenuItem>
        <MenuItem value="masaka">Masaka</MenuItem>
        <MenuItem value="rajabu">Rajabu</MenuItem>
      </Select>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        style={{ marginTop: "1rem" }}
        onClick={handlesave}
      >
        {loading ? (
          <div style={spinerStyle}>
            <Spinner loading={loading} /> Loading...{" "}
          </div>
        ) : (
          "Save"
        )}{" "}
      </Button>{" "}
      <h4></h4>{" "}
    </Card>
  );
}

export default Regteam;