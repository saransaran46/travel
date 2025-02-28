// import "./adminscreen.css";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Adminuser = () => {
//   const trips = [
//     {
//       userName: "Saran",
//       projectName: "Java",
//       status: null,
//       startLocation: "Chennai",
//       endLocation: "Coimbatore",
//       startDate: "20/11/1334",
//     },
//     {
//       userName: "Manoj",
//       projectName: "React",
//       status: "Approved",
//       startLocation: "Chennai",
//       endLocation: "Coimbatore",
//       startDate: "11/02/2221",
//     },
//   ];

//   const [isdata, setdata] = useState([]);
//   const getdaata = async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/auth/api/admin/travel-requests/",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       setdata(response.data);
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };
//   console.log(isdata, "manojjjj");
//   useEffect(() => {
//     getdaata();
//   }, []);
//   const getData = async (status, id) => {
//     try {
//       const response = await axios
//         .patch(
//           `http://127.0.0.1:8000/auth/api/admin/travel-requests/${id}/approve-reject/`,
//           { status: status }, // Passing `status` in the request body
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         )
//         .then(() => {
//           getdaata();
//         });
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   const handleapprove = (val) => {
//     getData("approved", val);
//   };
//   const handleReject = (val) => {
//     getData("rejected", val);
//   };
//   return (
//     <div className="container">
//       {isdata?.map((trip, index) => (
//         <div className="card" key={index}>
//             {console.log(trip,'zzzzz')}
//           <div className="card-body">
//             <div className="card-title">
//               <span className="title-card">Username: </span> {trip.username}
//             </div>
//             <div className="card-status">
//               <span className="title-card">Status: </span>
//               {trip.status !== "pending" ? (
//                 <span
//                   className={
//                     trip.status === "approved" ? "approved" : "rejected"
//                   }
//                 >
//                   {trip.status}
//                 </span>
//               ) : (
//                 "Pending"
//               )}
//             </div>
//             {/* Conditional buttons using ternary */}
//             {trip.status === "pending" ? (
//               <div className="btn-container">
//                 <button
//                   className="btn approve"
//                   onClick={handleapprove(trip.id)}
//                 >
//                   Approve
//                 </button>
//                 <button className="btn reject" onClick={handleReject(trip.id)}>
//                   Reject
//                 </button>
//               </div>
//             ) : null}
//           </div>
//           <div className="card-container">
//             <h5>
//               Project Name: <span>{trip.project_name}</span>
//             </h5>
//             <h5>
//               Start Location: <span>{trip.travel_start_loc}</span>
//             </h5>
//             <h5>
//               End Location: <span>{trip.travel_end_loc}</span>
//             </h5>
//             <h5>
//               Start Date: <span>{trip.travel_start_date}</span>
//             </h5>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Adminuser;










import "./adminscreen.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Adminuser = () => {
  const [isdata, setdata] = useState([]);

  // Fetch data
  const getdaata = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/auth/api/admin/travel-requests/",
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

  useEffect(() => {
    getdaata();
  }, []);

  // Function to update status
  const updateStatus = async (status, id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/auth/api/admin/travel-requests/${id}/approve-reject/`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      getdaata(); // Refresh data after update
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="container">
      {isdata.map((trip) => (
        <div className="card" key={trip.id}>
          <div className="card-body">
            <div className="card-title">
              <span className="title-card">Username: </span> {trip.username}
            </div>
            <div className="card-status">
              <span className="title-card">Status: </span>
              {trip.status !== "pending" ? (
                <span
                  className={trip.status === "approved" ? "approved" : "rejected"}
                >
                  {trip.status}
                </span>
              ) : (
                "Pending"
              )}
            </div>

            {/* Show buttons only if status is pending */}
            {trip.status === "pending" && (
              <div className="btn-container">
                <button
                  className="btn approve"
                  onClick={() => updateStatus("approved", trip.id)}
                >
                  Approve
                </button>
                <button
                  className="btn reject"
                  onClick={() => updateStatus("rejected", trip.id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>

          <div className="card-container">
            <h5>
              Project Name: <span>{trip.project_name}</span>
            </h5>
            <h5>
              Start Location: <span>{trip.travel_start_loc}</span>
            </h5>
            <h5>
              End Location: <span>{trip.travel_end_loc}</span>
            </h5>
            <h5>
              Start Date: <span>{trip.travel_start_date}</span>
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Adminuser;



