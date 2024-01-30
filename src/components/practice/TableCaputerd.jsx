import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import data from "./data";

function TableCapture() {
  const tableRef = useRef(null);
  const [img, setImg] = useState();

  const captureTable = async () => {
    html2canvas(tableRef.current, {
      scale: 3, // Set the scale factor (2 means double the size)
    }).then(function (canvas) {
      // const ccc = document.body.appendChild(canvas);
      const dataUrl = canvas.toDataURL();
      console.log(dataUrl);
      setImg(dataUrl);
      // canvas.toBlob((blob) => {
      //   console.log(blob);
      //   setImg(blob);
      // });
    });
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
