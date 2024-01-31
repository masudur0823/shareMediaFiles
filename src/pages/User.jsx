import React from "react";
import useShare from "../hooks/useShare";
import dummyData from "../mockData/dummyData";

function User() {
  const { sharePdf, isLoading, getFile, first } = useShare();
  const shareNavigator = () => {
    const input = document.getElementById("files");
    const files = input.files;
    navigator?.share({
      files: files,
      title: "Pdf !",
    });
  };
  return (
    <>
      {isLoading ? "Loading..." : ""}
      <input type="file" id="files" />

      <h1>There is some list of Dummy Users:</h1>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        {!getFile ? (
          <button onClick={() => sharePdf("printDom", "userTable")}>
            Prepare to Share
          </button>
        ) : (
          <button
            style={{ margiLeft: "10px" }}
            onClick={first === 1 ? shareNavigator : 0}
          >
            Share File
          </button>
        )}

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
        <div id="printDom" style={{ width: "fit-content" }}>
          <TableCaption />
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>departmet</th>
                <th>credit_card</th>
                <th>currency_code</th>
                <th>stock_name</th>
                <th>app_name</th>
                <th>app_version</th>
                <th>ip_address</th>
                <th>mac_address</th>
              </tr>
            </thead>
            <tbody>
              {dummyData?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.first_name}</td>
                  <td>{item?.last_name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.gender}</td>
                  <td>{item?.departmet}</td>
                  <td>{item?.credit_card}</td>
                  <td>{item?.currency_code}</td>
                  <td>{item?.stock_name}</td>
                  <td>{item?.app_name}</td>
                  <td>{item?.app_version}</td>
                  <td>{item?.ip_address}</td>
                  <td>{item?.mac_address}</td>
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
