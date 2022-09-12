import './App.css';
import { useEffect, useState, useCallback } from "react";
import axios from "axios";


function App() {
  const [error, setError] = useState("");
  const [races, setRaces] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [sortCol, setSortCol] = useState("Round");
  const [sortBy, setSortBy] = useState("desc");

  useEffect(() => {
    fetchRaces();
  }, []);

  useEffect(() => {
    setTableData(races);
  }, [races]);

  const sortTable = useCallback(() => {
    const sortKey = sortCol.toLowerCase();

    const sortedTable = [...races].sort((a, b) => {
      const aVal = sortKey === "round" ? parseInt(a[sortKey]) : a[sortKey];
      const bVal = sortKey === "round" ? parseInt(b[sortKey]) : b[sortKey];
      return (aVal > bVal ? 1 : aVal < bVal ? -1 : 0);
    });

    sortBy === "desc" ? setTableData(sortedTable) : setTableData(sortedTable.reverse());
  }, [sortCol, sortBy, races]);

  useEffect(() => {
    sortTable();
  }, [sortTable]);

  const fetchRaces = async () => {
    try {
      const res = await axios.get("/api/f1/");
      
      if (res && res.status === 200) {
        setError("");
        setRaces(res.data);
      } else {
        setError(`Error: ${res.status}. Something went wrong.`);
        setRaces([]);
      }
    } catch (error) {
      setError(`Error: ${error}`)
      setRaces([]);
    }
  };

  const handleHeaderClick = (col) => {
    if (sortCol === col) {
      setSortBy(sortBy === "desc" ? "asc" : "desc");
    } else {
      setSortBy("desc");
      setSortCol(col);
    }
  };

  const renderHeader = (col) => {
    if (sortCol === col) {
      return (
        <th onClick={() => handleHeaderClick(col)}>
          {col}
          <span className="sort-triangle">{sortBy === "desc" ? "▼" : "▲"}</span>
        </th>
      )
    } else {
      return (
        <th onClick={() => handleHeaderClick(col)}>{col}</th>
      )
    }
  };

  return (
    <div className="container">
      {error && <div>{error}</div>}
      {tableData.length > 0 && (
        <table className="table" cellSpacing="0">
          <thead>
            <tr>
              {renderHeader("Round")}
              {renderHeader("Circuit")}
              {renderHeader("Country")}
              {renderHeader("Date")}
            </tr>
          </thead>
          <tbody>
            {tableData.map((race) => {
              const { round, circuit, country, date } = race;
              const dateObj = new Date(date);
              const dateString = dateObj.toDateString().substr(4, 12);

              return (
                <tr className="table-row" key={date}>
                  <td>{round}</td>
                  <td>{circuit}</td>
                  <td>{country}</td>
                  <td>{dateString}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App;
