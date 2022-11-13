import React, { Component } from "react";
import { Button, Form } from "antd";

import { DownloadOutlined, FileWordOutlined } from "@ant-design/icons";

import { saveAs } from "file-saver";
import { Packer } from "docx";

import { DocumentCreator } from "@utils/cv-creator";

// TODO: validación de la fecha

const DocumentGenerator = ({ data }) => {
  function generate(data) {
    const documentCreator = new DocumentCreator();
    console.log(data);
    const doc = documentCreator.create(data.course, data.units, data.teacher);

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "planificacion.docx");
      console.log("Documento creado");
    });
  }

  return (
    <div style={{ maxWidth: 50 }}>
      <Button
        block
        type="link"
        size="small"
        icon={
          <>
            <DownloadOutlined />
            <FileWordOutlined />
          </>
        }
        onClick={() => generate(data)}>
        Descargar en Word
      </Button>
    </div>
  );
};

export default DocumentGenerator;
