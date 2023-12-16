import React, { useRef, useState } from "react";
import data from "./data";
import html2canvas from "html2canvas";
function WhatsAppShare2() {
  const tableRef = useRef(null);
  const [imgurl, setImgurl] = useState();

  const handleShare = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current);
      const imgData = canvas.toDataURL("image/png");
      setImgurl(imgData);
      const blob = await fetch(imgData).then((response) => response.blob());
      downloadBlob(blob, "downloaded_image.png");
    }
  };
  return (
    <div>
      {imgurl && <img src={imgurl} alt="imgurl" width={200} />}
      <button onClick={handleShare}>Download</button>
      <a href="https://wa.me">open whatsapp</a>
      <div className="table-container" ref={tableRef} id="printDom">
        <div style={{ padding: "30px" }}>
          <h1 style={{ textAlign: "center" }}>Student Details</h1>
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
                  <td>{index + 1}</td>
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
    </div>
  );
}

export default WhatsAppShare2;

function downloadBlob(blob, fileName) {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
