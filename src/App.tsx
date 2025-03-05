import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Formpage from "./pages/Formpage";
import { Toaster } from "react-hot-toast";
import Previewpage from "./pages/Previewpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
        </Route>
        <Route path="/edit/:templateId" element={<Createpage />} />
        <Route path="/form/:formId" element={<Formpage />} />
        <Route path="/preview/:formId" element={<Previewpage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
