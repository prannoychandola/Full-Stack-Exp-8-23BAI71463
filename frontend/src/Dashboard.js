import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) window.location.href = "/";
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/protected", {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    setData(res.data);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <button className="btn btn-success" onClick={fetchData}>
        Fetch Data
      </button>
      <button className="btn btn-danger ms-2" onClick={logout}>
        Logout
      </button>
      <pre>{data}</pre>
    </div>
  );
}

export default Dashboard;