import React, { useState, useEffect } from "react";
import "./App.css";
import Groups from "./components/groups";

function App() {
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "user"
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") || "title"
  );

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);
  }, [grouping, ordering]);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
  };

  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">Display &#9660;</button>
        <div className="dropdown-content">
          <div className="inner-dropdown" id="inner1">
            <label htmlFor="dropdown1">Grouping</label>
            <select
              id="dropdown1"
              value={grouping}
              onChange={handleGroupingChange}
            >
              <option value="user">User</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="inner-dropdown" id="inner2">
            <label htmlFor="dropdown2">Ordering</label>
            <select
              id="dropdown2"
              value={ordering}
              onChange={handleOrderingChange}
            >
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>
      <Groups grouping={grouping} ordering={ordering} />
      <div className="col"></div>
    </div>
  );
}

export default App;
