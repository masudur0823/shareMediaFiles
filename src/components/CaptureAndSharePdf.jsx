import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import data from "./data";
import jsPDF from "jspdf";

export default function CaptureAndShare() {
  const tableRef = useRef();
  const [img, setImg] = useState();

  const captureDomAndShare = async () => {
    // html2canvas(tableRef.current, {
    //   scale: 1, // Set the scale factor (2 means double the size)
    // }).then(function (canvas) {
    //   const dataUrl = canvas.toDataURL();
    //   //   console.log(dataUrl);
    //   setImg(dataUrl);
    //   const pdf = jsPDF();
    //   //addImage(imageData, format, x, y, width, height, alias, compression, rotation)
    //   //   pdf.addImage(dataUrl, "JPEG", 0, 0, 20, 20);
    //   //   pdf.addImage(dataUrl, "JPEG", 0, 0, 180, 180);
    //   //   pdf.addPage("a4", "p");
    //   //   pdf.addImage(dataUrl, "JPEG", 0, 0, 180, 180);
    //   //   pdf.addPage("a4", "p");
    //   //   pdf.addImage(dataUrl, "JPEG", 0, 0, 180, 180);
    //   //   console.log(pdf);
    //   //   pdf.save("doc-01");
    // });
    const DOM = document.getElementById("printDom");
    console.log(DOM);
    const pdf = jsPDF();
    pdf.html(document.getElementById("printDom"), {
      x: 15,
      y: 15,
      width: 300,
      callback: function (doc) {
        doc.save();
      },
    });
  };

  return (
    <>
      <div className="main-layout">
        <img src={img} alt="" style={{ border: "1px solid red" }} />

        <button onClick={captureDomAndShare} type="button">
          Share Table data!
        </button>
        <hr style={{ border: "1px dashed red", width: "100%" }} />
        {/* --------------------------------------------------------- */}

        {/* <button onClick={captureTable}>Capture and share</button> */}
      </div>
      <div className="table-container">
        <div
          ref={tableRef}
          id="printDom"
          style={{ position: "relative", width: "100%" }}
        >
          <h2 style={{ marginBottom: 10, textAlign: "center" }}>
            Table Caption
          </h2>
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
