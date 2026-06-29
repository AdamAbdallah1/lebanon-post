import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewsDetails from "./pages/NewsDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/news/:id" element={<NewsDetails />} />
    </Routes>
  );
}

export default App;