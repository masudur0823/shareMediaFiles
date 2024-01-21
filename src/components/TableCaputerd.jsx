import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import data from "./data";

function TableCapture() {
  const tableRef = useRef(null);
  const [img, setImg] = useState();

  const chunkSize = 200; // Adjust as needed
  const totalRows = data?.length;
  const numChunks = Math.ceil(totalRows / chunkSize);
  const captureTable = async () => {
    for (let i = 0; i < numChunks; i++) {
      const chunkStart = i * chunkSize;
      const chunkEnd = Math.min(chunkStart + chunkSize, totalRows);

      // Temporarily hide rows outside the current chunk
      const rows = tableRef.current.querySelectorAll("tr");
      for (let j = 0; j < rows.length; j++) {
        rows[j].style.display = j >= chunkStart && j < chunkEnd ? "" : "none";
      }

      const canvas = await html2canvas(tableRef.current);
      const imageDataURL = canvas.toDataURL("image/png");

      // Do something with the image data URL, like download or store it
      console.log(`Chunk ${i + 1} captured: ${imageDataURL}`);
      setImg(imageDataURL);

      // Restore row visibility for the next chunk
      for (let j = 0; j < rows.length; j++) {
        rows[j].style.display = "";
      }
    }
  };

  return (
    <div>
      <img src={img} alt="" />
      <br />
      <br />
      <hr />
      <button onClick={captureTable}>Capture Table</button>
      <hr />
      <br />
      <br />
      <hr />
      <br />
      <p style={{ textAlign: "center" }}>xxxx</p>
      <br />
      <hr />
      <br />
      <br />
      <table id="myTable" ref={tableRef}>
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
  );
}

export default TableCapture;
