import { useRef, useState } from "react";
import data from "./data";
import html2canvas from "html2canvas";

export default function WhatsAppShare1() {
  const imageRef = useRef(null);

  const tableRef = useRef(null);
  const [test, setTest] = useState("");

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "GeeksForGeeks",
          url: "https://geeksforgeeks.org",
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((err) => {
          // Handle errors, if occurred
          console.log("Error while using Web share API:");
          console.log(err);
        });
    } else {
      // Alerts user if API not available
      alert("Browser doesn't support this API !");
    }
  };

  const captureTable = async () => {
    const tableElement = document.getElementById("printDom"); // Replace with the actual ID of your table
    if (!tableElement) return;

    try {
      const canvas = await html2canvas(tableElement);
      canvas.toBlob((blob) => {
        const file = new File([blob], "table_capture.png", {
          type: "image/png",
        });
        console.log(file);
        setTest(file);
        // we can use the 'file' object as needed (e.g., upload, download, etc.)
      });
    } catch (error) {
      console.error("Error capturing table:", error);
    }
  };

  const handleNativeFileShare = async () => {
    // const files = imageRef?.current?.files;
    const files = [test];

    if (files?.length === 0) {
      console.log(`No files selected`);
    }
    if (!navigator?.canShare) {
      console.log(`Your browser doesn't support the Web Share API.`);
    }
    if (navigator?.canShare({ files })) {
      try {
        await navigator?.share({
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
  };

  return (
    <>
      <div className="main-layout">
        <button onClick={handleNativeShare}>Share me</button>
        <div>
          <label htmlFor="image">Select images to share:</label>
          <input type="file" accept="image/*" multiple ref={imageRef} />
        </div>
        <button onClick={handleNativeFileShare} type="button">
          Share your images!
        </button>
        <hr style={{ border: "1px dashed red", width: "100%" }} />
        {/* --------------------------------------------------------- */}

        <button onClick={captureTable}>Capture and share</button>
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
