import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
const Employee = () => {
  const navigate=useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    id: "",
    department: "",
    dob: "",
    gender: "",
    designation: "",
    salary: "",
  });
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [clicked, setClicked] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };
  const getemployee = () => {
    axios
      .get("https://employee-backend-ylon.onrender.com/employee")
      .then((result) => {
        if (result.data.Status) {
          setData(result.data.Result);
        } else alert(result.data.Error);
      })
      .catch((err) => console.log(err));
  };

 const Logout=()=>{
  axios
    .get("https://employee-backend-ylon.onrender.com/logout")
    .then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    })
    .catch((err) => console.log(err));
 }

 const handleDelete = (id) => {
   axios
     .delete("https://employee-backend-ylon.onrender.com/delete_employee/" + id)
     .then((result) => {
       if (result.data.Status) {
         window.location.reload();
       }
     })
     .catch((err) => console.log(err));
 }

 const ViewTable = () => {
   setClicked(true);
 };
  useEffect(() => {
    getemployee();
  }, []);

  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);
    try {
      const response = await axios.post(
        "https://employee-backend-ylon.onrender.com/submit",
        employee
      );
      setAlert({ type: "success", message: response.data });
      // Clear form fields on success if needed

      setEmployee({
        name: "",
        id: "",
        department: "",
        dob: "",
        gender: "",
        designation: "",
        salary: "",
      });
    } catch (error) {
      setAlert({ type: "error", message: error.response.data });
    } finally {
      getemployee();
    }
  };

  return (
    <div className="">
      <div className="flex justify-end mr-3 mt-2">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
          onClick={Logout}
          type="button"
        >
          Logout
        </button>
      </div>
      <div className="max-w-md min-h-height mx-auto ">
        <div className="flex items-center justify-center text-lg font-semibold ">
          Employee Form
        </div>
        {alert && (
          <div
            className={`alert ${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            }  px-4 py-2 mb-4 rounded`}
          >
            {alert.message}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Employee Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter name"
              name="name"
              value={employee.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="id"
            >
              Employee ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="id"
              type="text"
              placeholder="Enter ID"
              name="id"
              value={employee.id}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="department"
              name="department"
              value={employee.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dob"
              type="date"
              placeholder="Enter Date of Birth"
              name="dob"
              value={employee.dob}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-indigo-600 h-5 w-5"
                  name="gender"
                  value="male"
                  checked={employee.gender === "male"}
                  onChange={handleChange}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600 h-5 w-5"
                  name="gender"
                  value="female"
                  checked={employee.gender === "female"}
                  onChange={handleChange}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="designation"
              type="text"
              placeholder="Enter Designation"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="salary"
              type="text"
              placeholder="Enter Salary"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={ViewTable}
            >
              View table
            </button>
          </div>
        </form>
      </div>
      <div className="mt-3 flex justify-center">
        {clicked && (
          <table className="table-auto border-collapse  border-gray-500 mb-5">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">DOB</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Designation</th>
                <th className="px-4 py-2">Salary</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="border px-4 py-2">{e.employee_id}</td>
                  <td className="border px-4 py-2">{e.name}</td>
                  <td className="border px-4 py-2">{e.dob}</td>
                  <td className="border px-4 py-2">{e.department}</td>
                  <td className="border px-4 py-2">{e.gender}</td>
                  <td className="border px-4 py-2">{e.designation}</td>
                  <td className="border px-4 py-2">{e.salary}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 px-2 py-2 text-white rounded"
                      onClick={() => handleDelete(e.employee_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Employee;
