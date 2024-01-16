import { useRef, useState } from "react";
import data from "./data";
import html2canvas from "html2canvas";

export default function WhatsAppShare1() {
  const imageRef = useRef(null);
  const [test, setTest] = useState([]);

  const tableRef = useRef(null);
  const [imgurl, setImgurl] = useState();

  const handleShare = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current);
      const imgData = canvas.toDataURL("image/png");
      setImgurl(imgData);
      const blob = new Blob([imgData], { type: "image/png" });
      // const file = new File([blob], "heelo woerld", { type: "image/png" });
      setTest(blob);
    }
  };

  const base64ToBlob = (base64String) => {
    const parts = base64String.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

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

  const handleNativeFileShare = async () => {
    // console.log(imageRef.current.files);
    // const files = imageRef?.current?.files;
    // const files = test;
    // console.log(files);

    const data = {
      files: [
        new File([test], "image.png", {
          type: test.type,
        }),
      ],
      title: "My title",
      text: "My text",
    };
    if (navigator.canShare(data)) {
      await navigator.share(data);
    }
    // if (files?.length === 0) {
    //   console.log(`No files selected`);
    // }
    // if (!navigator?.canShare) {
    //   console.log(`Your browser doesn't support the Web Share API.`);
    // }
    // if (navigator?.canShare({ files })) {
    //   try {
    //     await navigator?.share({
    //       files,
    //       title: "Images",
    //       text: "Beautiful images",
    //     });
    //     console.log(`Shared!`);
    //   } catch (error) {
    //     console.log(`Error: ${error.message}`);
    //   }
    // } else {
    //   console.log(`Your system doesn't support sharing these files.`);
    // }
  };

  return (
    <div className="main-layout">
      <button onClick={handleNativeShare}>Share me</button>
      <div>
        <label for="files">Select images to share:</label>
        <input type="file" accept="image/*" multiple ref={imageRef} />
      </div>
      <button onClick={handleNativeFileShare} type="button">
        Share your images!
      </button>
      <hr style={{ border: "1px dashed red", width: "100%" }} />
      {/* --------------------------------------------------------- */}
      {imgurl && <img src={imgurl} alt="imgurl" width={200} />}

      <button onClick={handleShare}>Capture and share</button>

      <div className="table-container" ref={tableRef} id="printDom">
        <table style={{ borderCollapse: "collapse" }}>
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
  );
}
