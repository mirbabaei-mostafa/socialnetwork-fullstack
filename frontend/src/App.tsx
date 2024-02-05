import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import PersistAuth from "./components/authentications/PersistAuth";
import Home from "./pages/Home";
import NotAuthentication from "./components/authentications/NotAuthentication";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NotAuthentication />}>
          <Route path="/login" element={<Signin />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Route>
        <Route element={<PersistAuth />}>
          <Route path="/activate/:accesstoken" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
