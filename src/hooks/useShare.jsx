import jsPDF from "jspdf";

const useShare = () => {
  const sharePdf = async (id, filename) => {
    const source = document.getElementById(id);
    const offsetWidth = document.getElementById(id).offsetWidth;
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
        addPageNumbers(doc, doc.getNumberOfPages());
        // send natigator to share
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
    // pdf.text("Hello, this is your PDF!", 20, 20);

    const pdfBlob = pdf.output("blob");

    const files = [
      new File([pdfBlob], `${filename}.pdf`, { type: "application/pdf" }),
    ];

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
          title: "Pdf !",
        });
        console.log(`Shared!`);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    } else {
      console.log(`Your system doesn't support sharing these files.`);
    }
  };
  return sharePdf;
};

export default useShare;
