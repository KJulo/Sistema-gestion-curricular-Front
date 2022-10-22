import React, { Component } from "react";
import { Button, Form } from "antd";

import { DownloadOutlined, FileWordOutlined } from "@ant-design/icons";

import { saveAs } from "file-saver";
import { Packer } from "docx";

import { DocumentCreator } from "@utils/cv-creator";

const DocumentGenerator = ({ data }) => {

  function generate() {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create(data.course, data.units);

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "planificacion.docx");
      console.log("Documento creado");
    });
  }

  return (
    <div>
      <Button
      type="primary"
      shape="round"
      icon={<><DownloadOutlined /><FileWordOutlined /></>}
      onClick={()=>generate(data)}>Descargar en Word</Button>
    </div>
  )
}

export default DocumentGenerator;