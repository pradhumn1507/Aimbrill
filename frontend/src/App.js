import React, { useEffect } from "react";
import Header from "./components/Header";
import { read, utils } from 'xlsx';
import ShowImportedData from "./components/ShowImportedData";
import ShowFetchData from "./components/ShowFetchData";


function App() {
  const [data, setData] = React.useState([])
  const [employeeData, setEmployeeData] = React.useState([])
  const [open, setOpen] = React.useState(false);

  const addData = async () => {
    const newData = data.slice(1)
    try {
      const requestBody = JSON.stringify({ newData });

      const response = await fetch('http://localhost:5000/api/employees/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      });

      const responseData = await response.json();
      console.log(responseData);
      setOpen(false)
    } catch (err) {
      console.log(err);
    }
  };

  const extractRowsFromExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = utils.sheet_to_json(worksheet, { header: 1, raw: false });

        const parsedRows = rows.map((row, rowIndex) => {
          if (rowIndex === 0) {
            return row; // Keep the header row as it is
          }

          const parsedRow = row.map((cell, columnIndex) => {
            if (columnIndex === 3) {
              const date = new Date(Date.parse(cell));
              return date.toLocaleDateString(); // Convert to string representation
            }
            return cell;
          });

          return parsedRow;
        });

        resolve(parsedRows);
      };

      reader.onerror = (event) => {
        reject(event.target.error);
      };

      reader.readAsArrayBuffer(file);
    });
  };


  const handleFileUpload = async (event) => {
    setOpen(true)
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      try {
        const rows = await extractRowsFromExcel(file);
        console.log(rows);
        const updatedData = [...data, ...rows];
        setData(updatedData);
        event.target.value = null;
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    }
  }

  const fetchData = async () => {
    try {
      const request = await fetch('http://localhost:5000/api/employees/')
      const response = await request.json()
      console.log(response)
      setEmployeeData(response.sort((a,b)=>a.employeeID-b.employeeID));
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [data, open])

  return (
    <>
      <Header />
      <div className="app">
        <ShowImportedData data={data} open={open} setOpen={setOpen} addData={addData} handleFileUpload={handleFileUpload} />
        <ShowFetchData tableData={employeeData} />
      </div>
    </>
  );
}

export default App;
