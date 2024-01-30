import jsPDF from "jspdf";
import { useRef } from "react";
import data from "../practice/data";
export default function SharePdfs() {
  const tableRef = useRef();

  const captureDomAndShare1 = async () => {
    const source = document.getElementById("printDom");
    const offsetWidth = document.getElementById("printDom").offsetWidth;
    console.log(offsetWidth);
    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: [
        offsetWidth < 900 ? 1000 : offsetWidth + 90,
        offsetWidth < 900 ? 1000 : offsetWidth + 90,
      ], //[x,y]
      putOnlyUsedFonts: true,
      floatPrecision: "smart", // or "smart", default is 16
    });

    const addPageNumbers = (pdf, totalPages) => {
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.text(
          10,
          pdf.internal.pageSize.height - 10,
          `Page ${i} of ${totalPages}`
        );
      }
    };

    await pdf.html(source, {
      callback: function (doc) {
        pdf.text(20, 20, `Page kkk`);

        addPageNumbers(doc, doc.getNumberOfPages());
        // doc.save();
      },
      width: 1,
      x: offsetWidth < 900 ? 200 : 5,
      y: 5,
      margin: 30,

      autoPaging: "text",
    });

    // send to navigator.share
    // ----------------------------------
    // ----------------------------------
    // console.log(pdf);
    pdf.text("Hello, this is your PDF!", 20, 20);
    const pdfBlob = await pdf.output("blob");
    console.log(pdfBlob);
    const files = [
      new File([pdfBlob], "example.pdf", { type: "application/pdf" }),
    ];
    console.log(files);
    if (files) {
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
    }
  };

  return (
    <>
      <h1>gfgggg</h1>
      <div className="main-layout">
        <button onClick={captureDomAndShare1} type="button">
          Share Table data!
        </button>
        <hr style={{ border: "1px dashed red", width: "100%" }} />
      </div>
      <div style={{ overflow: "auto" }}>
        <div id="printDom" ref={tableRef} style={{ width: "fit-content" }}>
          <h2 style={{ marginBottom: 10, textAlign: "center" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            officia aliquam nihil nobis, et quisquam laboriosam quibusdam esse
            facilis aspernatur, quaerat quo a dignissimos! Dolor sapiente sequi
            laudantium delectus voluptatem ex eum atque assumenda, aperiam illo
            sint doloremque consequatur quibusdam quas rerum cumque blanditiis,
            minima commodi fugit inventore velit. Ratione!
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
