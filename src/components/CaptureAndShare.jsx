import { useRef } from "react";
import data from "./data";
import html2canvas from "html2canvas";

export default function CaptureAndShare() {
  const tableRef = useRef(null);

  const captureTable = async () => {
    const tableElement = document.getElementById("printDom");
    if (!tableElement) return;

    try {
      const canvas = await html2canvas(tableElement);
      canvas.toBlob((blob) => {
        const file = new File([blob], "table_capture.png", {
          type: "image/png",
        });
        const files = [file];
        if (files?.length === 0) {
          console.log(`No files selected`);
        }
        if (!navigator?.canShare) {
          console.log(`Your browser doesn't support the Web Share API.`);
        }
        if (navigator?.canShare({ files })) {
          try {
            navigator?.share({
              files,
              title: "Images",
              text: "Beautiful images",
            });
            console.log(`Shared!`);
          } catch (error) {
            console.log(`Error: ${error.message}`);
          }
        } else {
          console.log(`Your system doesn't support sharing these files.`);
        }
      });
    } catch (error) {
      console.error("Error capturing table:", error);
    }
  };

  const handleNativeFileShare = async () => {
    captureTable();
  };

  return (
    <>
      <div className="main-layout">
        <button onClick={handleNativeFileShare} type="button">
          Share Table data!
        </button>
        <hr style={{ border: "1px dashed red", width: "100%" }} />
        {/* --------------------------------------------------------- */}

        {/* <button onClick={captureTable}>Capture and share</button> */}
      </div>
      <div className="table-container" ref={tableRef}>
        <table style={{ borderCollapse: "collapse" }} id="printDom">
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
    </>
  );
}
