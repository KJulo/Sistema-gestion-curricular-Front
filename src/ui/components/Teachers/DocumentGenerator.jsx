import React, { Component } from "react";

import { saveAs } from "file-saver";
import { Packer } from "docx";
import { courseInformation } from "@utils/cv-data.js";
import { DocumentCreator } from "@utils/cv-creator";

const DocumentGenerator = () => {

  function generate() {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create(
      courseInformation
    );

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "planificacion.docx");
      console.log("Documento creado");
    });
  }

  return (
    <div>
      Documento Word listo
      <p>
        <button onClick={()=>generate()}>Descargar</button>
      </p>
    </div>
  )
}

export default DocumentGenerator;