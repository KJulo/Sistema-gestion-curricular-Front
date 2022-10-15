import React, { Component } from "react";
import { Button } from "antd";
import { DownloadOutlined, FileWordOutlined } from "@ant-design/icons";

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
      <p>
        <Button
        type="primary"
        shape="round"
        icon={<><DownloadOutlined /><FileWordOutlined /></>}
        onClick={()=>generate()}>Descargar en Word</Button>
      </p>
    </div>
  )
}

export default DocumentGenerator;