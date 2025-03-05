import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Formpage from "./pages/Formpage";
import { Toaster } from "react-hot-toast";
import Previewpage from "./pages/Previewpage";
import { Fab } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import FAQpage from "./pages/FAQpage";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/faq" element={<FAQpage />} />
        </Route>
        <Route path="/edit/:templateId" element={<Createpage />} />
        <Route path="/form/:formId" element={<Formpage />} />
        <Route path="/preview/:formId" element={<Previewpage />} />
      </Routes>
      <Toaster />
      <Fab
        color="secondary"
        aria-label="edit"
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: "1rem",
        }}
        onClick={() => {
          navigate("/faq");
        }}
      >
        <QuestionMarkIcon />
      </Fab>
    </>
  );
}

export default App;
