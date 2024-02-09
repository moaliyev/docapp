import toast, { Toaster } from "react-hot-toast";
// Material UI
import {
  Divider,
  Stack,
  Card,
  Avatar,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Drawer,
  Container,
} from "@mui/material";

import dayjs from "dayjs";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";

import axios from "axios";
import Loader from "./../components/Loader";
import { DateField } from "@mui/x-date-pickers/DateField";

import "../assets/css/View.css";
import { Link } from "react-router-dom";

const ViewAppointments = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(dayjs("2024-01-01"));
  const [deleteDataId, setDeleteDataId] = useState(0);

  const handleDelete = async id => {
    await axios
      .delete(`${process.env.REACT_APP_DELETE_APPOINTMENT}${id}`)
      .then(res =>
        toast.success("Appointment deleted successfully", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        })
      )
      .catch(err => {
        console.log(err);
        toast.error("An error occured", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  useEffect(() => {
    const getAppointments = async () => {
      await axios
        .all([
          axios.get(process.env.REACT_APP_GET_APPOINTMENTS, {
            params: {
              date: `${date.year()}-${date.month() + 1 < 10 ? "0" : ""}${
                date.month() + 1
              }-${date.day() < 10 ? "0" : ""}${date.day()}`,
            },
          }),
          axios.get(process.env.REACT_APP_GET_DOCTORS),
        ])
        .then(
          axios.spread((appointments, doctors) => {
            setAppointments(appointments.data);
            setDoctors(doctors.data);
            setTimeout(() => setIsLoading(false), 1000);
          })
        );
    };

    getAppointments();
  }, [date]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="viewAppointments">
          <Toaster position="top-right" />
          {/* Dialog to open when trying to delete an appointment */}
          <Dialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this appointment?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquam, maiores.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDeleteDialogOpen(false)}>No</Button>
              <Button
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  handleDelete(deleteDataId);
                }}
                autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Container maxWidth="lg">
            <Typography variant="h4" className="viewHeader">
              View Appointments for:{" "}
              <DateField
                label="Appointment Date"
                value={date}
                onChange={newDate => setDate(newDate)}
              />
            </Typography>

            <Drawer variant="permanent" open={true} />
            <Stack
              direction={{ sm: "column", md: "row" }}
              gap="15px"
              spacing={4}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center">
              {appointments.map(item => (
                <Card key={item.id}>
                  <CardContent>
                    <Typography
                      component="div"
                      sx={{ fontSize: { xs: "10px", md: "10px" } }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}>
                      <Avatar
                        sx={{ bgcolor: "red"[500] }}
                        aria-label="recipe"
                        alt={
                          doctors.find(doctor => doctor.id == item.doctorId)[
                            "name"
                          ]
                        }
                      />
                    </Typography>
                    <Typography variant="h5" component="div" textAlign="center">
                      Doctor{" "}
                      {
                        doctors.find(doctor => doctor.id == item.doctorId)[
                          "name"
                        ]
                      }
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}>
                      <ListItem
                        disablePadding
                        style={{ marginBlock: "2px", alignItems: "center" }}>
                        <ListItemIcon>
                          <Link to="/edit">
                            <IconButton aria-label="comments">
                              <EditIcon />
                            </IconButton>
                          </Link>
                        </ListItemIcon>
                        <ListItemText>
                          {item.patientName} |{" "}
                          {`${item.startTime} - ${item.endTime}`}
                        </ListItemText>
                        <ListItemIcon>
                          <IconButton
                            aria-label="comments"
                            onClick={() => {
                              setIsDeleteDialogOpen(true);
                              setDeleteDataId(item.id);
                            }}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Container>
        </section>
      )}
    </>
  );
};

export default ViewAppointments;
