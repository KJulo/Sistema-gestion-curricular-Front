import React, { Component } from "react";

import { saveAs } from "file-saver";
import { Packer } from "docx";
import { experiences, education, skills, achievements } from "@utils/cv-data";
import { DocumentCreator } from "@utils/cv-creator";

const DocumentGenerator = () => {

  function generate() {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      experiences,
      education,
      skills,
      achievements
    ]);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
  return (
    <div>
      Holaa
      <p>
        Start editing to see some magic happen :)
        <button onClick={()=>generate()}>Generate CV with docx!</button>
      </p>
    </div>
  )
}

export default DocumentGenerator;