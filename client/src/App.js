import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import RegisterUser from "./components/registerUser";
import UserForm from "./components/userForm.js";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <SnackbarProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registerUser" element={<RegisterUser />}></Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
