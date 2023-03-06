import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import RegisterUser from "./components/registerUser";
import Viewallcompanies from "./components/viewallcompanies.js";
import UserForm from "./components/userForm.js";
import Viewallusers from "./components/viewallusers";
import { CompanyContext } from "./contexts/selectedCompany.js";
import { useState } from "react";

import { SnackbarProvider } from "notistack";
function App() {
  let [compName, setCompname] = useState("");
  let [companyNames, setCompanynames] = useState([]);
  return (
    <SnackbarProvider>
      <CompanyContext.Provider value={{compName,setCompname,companyNames,setCompanynames}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerUser" element={<RegisterUser />}></Route>
          <Route
            path="/viewandmanagecompanies"
            element={<Viewallcompanies />}
          ></Route>
          <Route
            path="/viewandmanageusers"
            element={<Viewallusers />}
          ></Route>
        </Routes>
      </CompanyContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
