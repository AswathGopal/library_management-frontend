import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Employee from "./Pages/Employee";
import Library from "./Pages/Library"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/employee" element={<Employee/>}></Route>
          <Route path="/" element={<Library/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
