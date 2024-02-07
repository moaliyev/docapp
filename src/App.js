import { Routes, Route } from "react-router-dom";

// Pages
import ViewAppointments from "./pages/ViewAppointments";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ViewAppointments />} />
      </Routes>
    </main>
  );
}

export default App;
