import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

// Set the workerSrc for PDF.js
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.js`;

const PdfReader = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
        console.log("PDF loaded:", pdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    if (pdfUrl) {
      loadPdf();
    }
  }, [pdfUrl]);

  return <div>PDF Loaded: {numPages ? `${numPages} pages` : "Loading..."}</div>;
};

export default PdfReader;
