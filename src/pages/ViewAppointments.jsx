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
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(process.env.REACT_APP_GET_APPOINTMENTS, {
          params: { date: "2024-01-01" },
        })
        .then(res => {
          setAppointment(res.data);
          setTimeout(() => setIsLoading(false), 1000);
        });
    };
    getData();
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
              <Card>
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
                      alt="Doctor Sm1"
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
              <Card>
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
                      alt="Doctor Sm1"
                    />
                  </Typography>
                  <Typography variant="h5" component="div">
                    Doctoc Mahammad
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </ThemeProvider>
        </section>
      )}
    </>
  );
};

export default ViewAppointments;
