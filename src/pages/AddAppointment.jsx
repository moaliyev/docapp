import {
  Container,
  Typography,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import axios from "axios";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import "../assets/css/Edit.css";
import toast, { Toaster } from "react-hot-toast";

const AddAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [doctor, setDoctor] = useState("");
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [date, setDate] = useState(dayjs());
  const [errors, setErrors] = useState({
    doctor: "No assigned doctor",
    patientName: "Patient name cannot be empty",
    time: "",
  });

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(process.env.REACT_APP_GET_DOCTORS)
        .then(res => setDoctors(res.data));
    };
    getData();
  }, []);

  const handleSubmit = () => {
    if (
      errors.doctor.length === 0 &&
      errors.patientName.length === 0 &&
      errors.time.length === 0
    )
      axios
        .post(`${process.env.REACT_APP_ADD_APPOINTMENT}`, {
          doctorId: doctor.id,
          startTime: startTime.format("HH:mm"),
          endTime: endTime.format("HH:mm"),
          patientName,
          date: date.format("YYYY-MM-DD"),
        })
        .then(res => {
          console.log(res.data);
          toast.success("Appointment updated successfully", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        })
        .catch(err => console.log(err));
  };

  return (
    <section className="edit">
      <Toaster position="top-right" />

      <Container
        maxWidth="lg"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "calc(100vh - 70px)",
        }}>
        <form
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            border: "1px solid black",
            width: "550px",
            padding: "40px",
            background: "rgba(24, 20, 20, 0.987)",
            boxShadow: "0 15px 25px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
          }}>
          <Typography variant="h4" className="viewHeader">
            Add Appointment
          </Typography>
          <div>
            <Autocomplete
              required
              disablePortal
              value={doctor || null}
              onChange={(e, newValue) => {
                setDoctor(newValue);
                if (newValue === null) {
                  setErrors({ ...errors, doctor: "No assigned doctor" });
                } else {
                  setErrors({ ...errors, doctor: "" });
                }
              }}
              options={doctors}
              getOptionLabel={item => item.name}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={params => <TextField {...params} label="Doctor" />}
            />
            {errors.doctor.length !== 0 ? (
              <span className="err">{errors.doctor}</span>
            ) : (
              ""
            )}
          </div>

          <div>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Patient Name"
              variant="outlined"
              value={patientName || ""}
              onChange={e => {
                setPatientName(e.target.value);
                if (e.target.value.length === 0) {
                  setErrors({
                    ...errors,
                    patientName: "Patient name cannot be empty",
                  });
                } else if (e.target.value.trim().length < 6) {
                  setErrors({
                    ...errors,
                    patientName: "Patient name must contain at lest 6 letters",
                  });
                } else {
                  setErrors({ ...errors, patientName: "" });
                }
              }}
            />
            {errors.patientName.length !== 0 ? (
              <span className="err">{errors.patientName}</span>
            ) : (
              ""
            )}
          </div>

          <DatePicker
            label="Appointment date"
            format="DD-MM-YYYY"
            value={date}
            defaultValue={date}
            onChange={newValue => setDate(newValue)}
            disablePast
          />

          <div
            className="inputController"
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
              flexWrap: "wrap",
            }}>
            <TimePicker
              sx={{ flex: "0 0 49%" }}
              value={startTime}
              onChange={newValue => {
                setStartTime(newValue);
                if (endTime.isBefore(newValue)) {
                  setErrors({
                    ...errors,
                    time: "Start time must be before end time",
                  });
                } else {
                  setErrors({ ...errors, time: "" });
                }
              }}
              format="HH:mm"
              label="Start Time"
              ampm={false}
            />
            <TimePicker
              sx={{ flex: "0 0 48%" }}
              format="HH:mm"
              label="End Time"
              value={endTime}
              ampm={false}
              onChange={newValue => {
                setEndTime(newValue);
                if (newValue.isBefore(startTime)) {
                  setErrors({
                    ...errors,
                    time: "Start time must be before end time",
                  });
                } else {
                  setErrors({ ...errors, time: "" });
                }
              }}
            />
            {errors.time.length !== 0 ? (
              <span className="err">{errors.time}</span>
            ) : (
              ""
            )}
          </div>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Add
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default AddAppointment;
