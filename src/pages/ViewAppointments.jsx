// Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
} from "@mui/material";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";

import axios from "axios";
import Loader from "./../components/Loader";

const ViewAppointments = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const getAppointments = async () => {
      const resolveRequest = () => {
        axios.spread((appointments, doctors) => {
          setAppointments(appointments);
          setDoctors(doctors);
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      };
      await axios
        .all([
          axios.get(process.env.REACT_APP_GET_APPOINTMENTS, {
            params: { date: "2024-01-01" },
          }),
          axios.get(process.env.REACT_APP_GET_APPOINTMENTS),
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
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="viewAppointments">
          <Typography
            variant="h3"
            textAlign="center"
            style={{ marginBlock: "16px" }}>
            View Appointments for
          </Typography>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
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
                  Neque, ipsam!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsDeleteDialogOpen(false)}>No</Button>
                <Button onClick={() => setIsDeleteDialogOpen(false)} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <Stack direction="row" spacing={2}>
              {appointments.map(item => (
                <Card key={item.id}>
                  <CardContent>
                    <Typography
                      component="div"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}>
                      <Avatar
                        sx={{ bgcolor: "red"[500] }}
                        aria-label="recipe"
                        // alt={}
                      />
                    </Typography>
                    <Typography variant="h5" component="div">
                      Doctoc Mahammad
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
                          <IconButton aria-label="comments">
                            <EditIcon />
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText>Salam</ListItemText>
                        <ListItemIcon>
                          <IconButton
                            aria-label="comments"
                            onClick={() => setIsDeleteDialogOpen(true)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </ThemeProvider>
        </section>
      )}
    </>
  );
};

export default ViewAppointments;
