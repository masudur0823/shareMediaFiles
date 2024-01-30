import React from "react";
import data from "../components/practice/data";
import useShare from "../hooks/useShare";

function User() {
  const sharePdf = useShare();
  return (
    <>
      <h1>There is some list of Dummy Users:</h1>
      <div
        style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
        onClick={() => sharePdf("printDom", "userTable")}
      >
        <button>share pdf</button>
        {/* <button
          style={{ margiLeft: "10px" }}
          onClick={() => sharePdf("printDom")}
        >
          download pdf
        </button> */}
      </div>
      <div className="main-layout">
        <hr style={{ border: "1px dashed red", width: "100%" }} />
      </div>
      <div style={{ overflow: "auto" }}>
        <div
          id="printDom"
          // style={{ width: "fit-content" }}
        >
          <TableCaption />
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item?.first_name}</td>
                  <td>{item?.last_name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default User;

function TableCaption() {
  return (
    <>
      <div style={{ width: "100%", marginBottom: 50 }}>
        <h2 style={{ textAlign: "center" }}>User table</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p>
              <b>Name:</b> <span>Masud</span>
            </p>
            <p>
              <b>ID:</b> <span>1234</span>
            </p>
          </div>
          <div>
            <p>
              <b>Date:</b> <span>12/11/2023</span>
            </p>
            <p>
              <b>Location:</b> <span>Tongi</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
