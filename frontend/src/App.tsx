import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="*" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
