import React, { useEffect, useState } from "react";
import "./Userscreen.css";
import axios from "axios";
import Logo from "../../UIkit/logo";

const Userscreen = () => {
  const [isdata, setdata] = useState([]);
  useEffect(() => {
    const getdaata = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/auth/api/travel-requests/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setdata(response.data); 
      } catch (error) {
        console.error("API Error:", error); 
      }
    };
    getdaata();
  }, []);
  console.log(isdata, "manojjjj");

  const Hnadleclick = () => {
    window.location.href = "/requestform";
  };

  return (
    <div className="container">
      <div className="header">
        <div style={{marginLeft: "10px"}}>
          <Logo fontSize={20} />{" "}
        </div>
        <div>
          <button onClick={Hnadleclick} className="userbutton">
            Add request
          </button>
        </div>
      </div>
      {isdata?.map((val, index) => (
        <div className="card" key={index}>
          <div className="card-body">
            <div className="card-title">
              <span className="title-card">ProjectName:</span>{" "}
              <span className="truncate">{val.project_name}</span>
            </div>
            <div className="card-status">
              <span className="title-card">Status:</span> {val.status}
            </div>
          </div>
          <div className="card-bodys">
            <div className="card-dateEnd">
              <span className="title-card">StartLocation: </span>{" "}
              {val.travel_start_loc}
            </div>
            <div className="card-dateEnd">
              <span className="title-card">EndLocation: </span>{" "}
              {val.travel_end_loc}
            </div>
          </div>
        </div>
      )).reverse()}
    </div>
  );
};

export default Userscreen;
