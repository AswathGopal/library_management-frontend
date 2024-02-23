import React,{useState,useEffect} from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode} from "primereact/api";
import axios from 'axios';

const Library = () => {
  const [employee, setEmployee] = useState({
    name: "",
    author: "",
    subject: "",
    date: "",
    count: 0,
  });
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [clicked, setClicked] = useState(false);
   const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  
    const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters["global"].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
    };
 const renderHeader = () => {
   return (
     <div className="flex justify-content-end">
       <span className="p-input-icon-left">
         <i className="pi pi-search" />
         <InputText
           value={globalFilterValue}
           onChange={onGlobalFilterChange}
           placeholder="Keyword Search"
         />
       </span>
     </div>
   );
 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };
  const getemployee = () => {
    axios
      .get("http://localhost:8000/library")
      .then((result) => {
        if (result.data.Status) {
          setData(result.data.Result);
        } else alert(result.data.Error);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getemployee();
  }, []);
 
  const ViewTable=()=>{
    setClicked(true);
  }

  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);
    try {
      const response = await axios.post(
        "http://localhost:8000/librarysubmit",
        employee
      );
      setAlert({ type: "success", message: response.data });
      // Clear form fields on success if needed

      setEmployee({
        name: "",
        author: "",
        subject: "",
        date: "",
        count: 0,
      });
    } catch (error) {
      setAlert({ type: "error", message: error.response.data });
    } finally {
      getemployee();
    }
  };


   const header = renderHeader();

  return (
    <div className="mt-5">
      <div className="max-w-md min-h-height mx-auto ">
        <div className="flex items-center justify-center text-lg font-semibold ">
          Library Management
        </div>
        {alert && (
          <div
            className={`alert ${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white px-4 py-2 mb-4 rounded`}
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
              Book Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Book name"
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
              Author
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="author"
              type="text"
              placeholder="Author"
              name="author"
              value={employee.author}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="id"
            >
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              placeholder="subject"
              name="subject"
              value={employee.subject}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dob"
            >
              Date Of Publish
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              placeholder="Enter Date of Birth"
              name="date"
              value={employee.date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="designation"
            >
              Count
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="count"
              type="number"
              placeholder="Count"
              name="count"
              value={employee.count}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add
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
      <div className="mt-3 mb-5 ">
        {clicked && (
          <DataTable
            value={data}
            filters={filters}
            filterDisplay="row"
            globalFilterFields={["title", "author", "subject"]}
            header={header}
            emptyMessage="No customers found."
            paginator
            rows={10}
            rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
          >
            <Column
              field="title"
              header="Book Name"
              // filter
              // filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
              className="border-b px-4 "
              sortable
            />
            <Column
              field="author"
              header="Author"
              className="border-b px-4"
              sortable
            />
            <Column
              field="subject"
              header="Subject"
              style={{ minWidth: "10rem" }}
              // filter
              // filterElement={FilterTemplate}
              sortable
              className="border-b px-4"
            />
            <Column
              field="date"
              header="Publish Date"
              className="border-b"
              style={{ minWidth: "10rem" }}
              sortable
            />
            <Column
              field="count"
              header="Count"
              className="border-b px-4"
              dataType="numeric"
              style={{ minWidth: "10rem" }}
              sortable
            />
            {/* <Column
              header="Action"
              body={actionTemplate}
              className="border-b px-4"
            ></Column> */}
          </DataTable>
        )}
      </div>
    </div>
  );
}

export default Library
