import data from "./data";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

export default function WhatsAppShare1() {
  const tableRef = useRef(null);
  const [imgurl, setImgurl] = useState();
  const handleShare = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current);
      const imgData = canvas.toDataURL("image/png");
      setImgurl(imgData);
      // const message = "This is text.";
      // const blob = await fetch(imgData).then((response) => response.blob());

      // // Create WhatsApp link with image data
      // const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      //   `${message} ${link} `
      // )}`;

      // // Open WhatsApp with image link
      // window.open(whatsappLink, "_blank");
    }
  };

  return (
    <div className="main-layout">
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
