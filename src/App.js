import { Routes, Route } from "react-router-dom";

// Pages
import ViewAppointments from "./pages/ViewAppointments";
import Header from "./components/Header";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<ViewAppointments />} />
      </Routes>
    </main>
  );
}

export default App;
