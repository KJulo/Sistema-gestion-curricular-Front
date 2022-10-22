import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  Table,
  TableRow,
  TableCell,
} from "docx";

export class DocumentCreator {
  // tslint:disable-next-line: typedef
  create(course, units) {
    const document = new Document({
      sections: [
        {
          children: [
            this.createHeading("Planificación Anual"),
            new Paragraph({
              text: "",
              spacing: {
                line: 276,
              },
            }),
            this.createContactInfo(course),
            this.createTable(units),
          ]
        }
      ]
    });

    return document;
  }

  createContactInfo({subject, course, teacher, date}) {
    return new Paragraph({
      // alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "Asignatura "+subject,
          bold: true,
          break: 1,
        }),
        new TextRun({
          text: "Curso "+course,
          bold: true,
          break: 1,
        }),
        new TextRun({
          text: "Profesor "+teacher,
          bold: true,
          break: 1,
        }),
        new TextRun({
          text: "Año "+date,
          bold: true,
          break: 1,
        }),
      ]
    });
  }

  createTable(units) {
    return new Table({
      columnWidths: [4300, 2300, 2300],
      rows: [
        // Fila 1
        this.createTableRow(["UNIDADES DE APRENDIZAJE", "TIEMPO (mes)", "VALOR"]),
        // Filas n
        units.map((unit) => (
          this.createTableRow([unit.nombre+": Diversidad e interacciones en los ecosistemas chilenos. Habilidades de investigación, experimentos, trabajo con tablas y gráficos. (24 horas)", "Tiempo en meses: Marzo a mayo ", "Responsabilidad"])
        )),
        // Si no va esta fila adicional, se buguea la tabla
        this.createTableRow(["", "", ""]),
      ]
    })
  }

  createTableRow(paragraphs) {
    return new TableRow({
      children: paragraphs.map((paragraph) => (
        new TableCell({
          children: [new Paragraph({
            text: paragraph,
            bold: true,
          })],
        })
      )),
    })
  }

  createHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.TITLE,
      thematicBreak: true
    });
  }

  createSubHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2
    });
  }

  createInstitutionHeader(
    institutionName,
    dateText
  ) {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true
        })
      ]
    });
  }

  createRoleText(roleText) {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true
        })
      ]
    });
  }

  createBullet(text) {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0
      }
    });
  }

  // tslint:disable-next-line:no-any
  createSkillList(skills) {
    return new Paragraph({
      children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
    });
  }

  // tslint:disable-next-line:no-any
  createAchivementsList(achivements) {
    return achivements.map(
      achievement =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0
          }
        })
    );
  }

  createInterests(interests) {
    return new Paragraph({
      children: [new TextRun(interests)]
    });
  }

  splitParagraphIntoBullets(text) {
    return text.split("\n\n");
  }

  // tslint:disable-next-line:no-any
  createPositionDateText(
    startDate,
    endDate,
    isCurrent
  ) {
    const startDateText =
      this.getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent
      ? "Present"
      : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  getMonthFromInt(value) {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "N/A";
    }
  }
}