import { useState } from "react";
import data from "./data";
import html2canvas from "html2canvas";

export default function CaptureAndShare() {
  const [imgs, setImgs] = useState([]);
  // const [img, setImg] = useState();

  const captureDomAndShare = async () => {
    const tableElement = document.getElementById("printDom");
    if (!tableElement) return;

    try {
      const canvasHeight = await html2canvas(tableElement, { scale: 1 });
      const OriginalImageHeight = canvasHeight.height;
      console.log("OriginalImageHeight:", OriginalImageHeight);
      const CropHeight = 500;
      const totalPages = Math.ceil(OriginalImageHeight / CropHeight);
      const totalCanvas = [];
      const totalFile = [];
      for (let index = 0; index < totalPages; index++) {
        const canvas = await html2canvas(tableElement, {
          scale: 1,
          y: index === 0 ? 0 : CropHeight * index,
          height: CropHeight,
          onclone: (clone) => {
            let additionalElement = document.createElement("div");
            additionalElement.innerHTML = `<p>${index + 1}</p>`;
            additionalElement.style.color = "red";

            // Append the additional element to the cloned content
            clone.getElementById("printDom").appendChild(additionalElement);
          },
        });
        canvas.toBlob((blob) => {
          const file = new File([blob], `table_capture${index}.png`, {
            type: "image/png",
          });
          totalFile.push(file);
        });
        totalCanvas.push(canvas.toDataURL());
      }
      setImgs(totalCanvas);
      const files = totalFile;
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
      // ------------------------------------------------- +++++++++++++++++++----------
      // ------------------------------------------------- +++++++++++++++++++----------
      // ------------------------------------------------- +++++++++++++++++++----------
      // ------------------------------------------------- +++++++++++++++++++----------
      // setImg(canvas.toDataURL());
      // const Height = canvas.height;
      // console.log("Height:", Height);
      // -----------------------------------------------
      // canvas.toBlob((blob) => {
      //   // const file = new File([blob], "table_capture.png", {
      //   //   type: "image/png",
      //   // });
      //   // const files = [file];
      //   // if (files?.length === 0) {
      //   //   console.log(`No files selected`);
      //   // }
      //   // if (!navigator?.canShare) {
      //   //   console.log(`Your browser doesn't support the Web Share API.`);
      //   // }
      //   // if (navigator?.canShare({ files })) {
      //   //   try {
      //   //     navigator?.share({
      //   //       files,
      //   //       title: "Images",
      //   //       text: "Beautiful images",
      //   //     });
      //   //     console.log(`Shared!`);
      //   //   } catch (error) {
      //   //     console.log(`Error: ${error.message}`);
      //   //   }
      //   // } else {
      //   //   console.log(`Your system doesn't support sharing these files.`);
      //   // }
      // });
      // const canvas = await html2canvas(tableElement, {
      //   scale: 1,
      //   onclone: (clone) => {
      //     // Add additional HTML elements to the cloned content
      //     var additionalElement = document.createElement("div");
      //     additionalElement.innerHTML = `<p>${1}</p>`;
      //     // Apply styling to the cloned content or additional elements
      //     additionalElement.style.color = "red";
      //     // Append the additional element to the cloned content
      //     clone.getElementById("printDom").appendChild(additionalElement);
      //   },
      // });
      // const dataurl = canvas.toDataURL();
      // setImg(dataurl);
    } catch (error) {
      console.error("Error capturing table:", error);
    }
  };

  return (
    <>
      <div className="main-layout">
        {/* <img src={img} alt="" /> */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {imgs.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              style={{ border: "1px solid red" }}
            />
          ))}
        </div>
        <button onClick={captureDomAndShare} type="button">
          Share Table data!
        </button>
        <hr style={{ border: "1px dashed red", width: "100%" }} />
        {/* --------------------------------------------------------- */}

        {/* <button onClick={captureTable}>Capture and share</button> */}
      </div>
      <div className="table-container">
        <div id="printDom">
          <h2 style={{ marginBottom: 10, textAlign: "center" }}>
            Table Caption
          </h2>
          <table style={{ borderCollapse: "collapse", margin: "0 auto" }}>
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
