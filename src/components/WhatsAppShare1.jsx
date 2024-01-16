import { useRef, useState } from "react";
import data from "./data";
import html2canvas from "html2canvas";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

export default function WhatsAppShare1() {
  const shareUrl = "https://github.com/masudur0823";
  const title = "Share me";
  const tableRef = useRef(null);
  const [imgurl, setImgurl] = useState();
  const handleShare = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current);
      const imgData = canvas.toDataURL("image/png");
      setImgurl(imgData);
    }
  };

  return (
    <div className="main-layout">
      <button onClick={() => navigator.share("hi")}>Share me</button>
      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=":: "
        className="Demo__some-network__share-button"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

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
