import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import PersistAuth from "./components/authentications/PersistAuth";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route element={<PersistAuth />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
