import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Employee from "./Pages/Employee";
import Login from "./Pages/Login";
import PrivateRoute from "./Pages/PrivateRoute";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <Employee />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
