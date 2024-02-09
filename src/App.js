import { Routes, Route } from "react-router-dom";

// Pages
import ViewAppointments from "./pages/ViewAppointments";
import Header from "./components/Header";

// Material UI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" element={<ViewAppointments />} />
          </Routes>
        </ThemeProvider>
      </main>
    </LocalizationProvider>
  );
}

export default App;
