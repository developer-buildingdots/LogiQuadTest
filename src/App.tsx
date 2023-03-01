import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { CountryCurrency } from "./types";

const URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";

function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<CountryCurrency[]>([]);
  const [filteredData, setFilteredData] = useState<CountryCurrency[]>([]);

  const getCountryCodes = async () => {
    try {
      const response: { data: { [key: string]: string } } = await axios.get(
        URL
      );
      if (response.data) {
        const mapData = Object.keys(response.data).map((key: string) => ({
          code: key,
          country: response.data[key],
        }))
        setData(mapData);
        setFilteredData(mapData)
      }
    } catch (error) {
      console.error(error);
      setError("Some Error Occurred");
    }
    setLoading(false);
  };

  useEffect(() => {
    getCountryCodes();
  }, []);

  if (isLoading) {
    return <span>Fetching Data..</span>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const search = (value: string) => {
    const filerData = data.filter(row => row.code.toLowerCase().includes(value.toLowerCase()) || row.country.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filerData);
  }

  return (
    <div className="container">
      <input className="searchText" placeholder="Search" onChange={(e)=> search(e.target.value)}></input>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr>
              <td>{row.code}</td>
              <td>{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
