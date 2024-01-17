import React, { useState } from "react";
import data from "./data";
import html2canvas from "html2canvas";
function WhatsAppShare2() {
  const [overflow, setOverflow] = useState("initial");
  // const tableRef = useRef(null);
  // const [imgurl, setImgurl] = useState(null);

  const handleShare = async () => {
    const divToCapture = document.getElementById("divToCapture");

    await html2canvas(divToCapture)
      .then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "captured_image.png";
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error capturing and downloading image:", error);
      });
  };

  return (
    <div>
      {/* {imgurl && <img src={imgurl} alt="imgurl" width={200} />} */}
      <button onClick={handleShare}>Download</button>
      <a href="https://wa.me">open whatsapp</a>
      <div className="table-container" id="divToCapture">
        <div style={{ padding: "30px", overflow: overflow }}>
          <h1 style={{ textAlign: "center" }}>Student Details</h1>
          <div>
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
    </div>
  );
}

export default WhatsAppShare2;
