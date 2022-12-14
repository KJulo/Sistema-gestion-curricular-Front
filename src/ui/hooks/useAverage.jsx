export function useAverage(marks, decimals) {
  let total = 0;
  let subjects = 0;
  let sumBySubjects = {};

  if (!marks) return 0;

  // Hacer suma por cada asignatura
  marks.map((mark) => {
    if (mark.asignatura in sumBySubjects == false) {
      subjects += 1;
      sumBySubjects[mark.asignatura] = 0;
    }
    sumBySubjects[mark.asignatura] += mark.nota * mark.ponderacion;
  });

  // Promediar las asignaturas
  let keySubjects = Object.keys(sumBySubjects);
  keySubjects.map((subject) => {
    total += sumBySubjects[subject];
  });

  return (total / subjects).toFixed(decimals);
}

export function useAverageBySubject(marks, subject, decimals) {
  console.log(marks, subject, decimals);
  let total = 0;
  let subjects = 0;
  let sumBySubjects = {};

  if (!marks) return 0;

  const filterMarks = marks.filter((mark) => mark.asignatura === subject);

  // Hacer suma por cada asignatura
  filterMarks.map((mark) => {
    if (mark.asignatura in sumBySubjects == false) {
      subjects += 1;
      sumBySubjects[mark.asignatura] = 0;
    }
    sumBySubjects[mark.asignatura] += mark.nota * mark.ponderacion;
  });

  // Promediar las asignaturas
  let keySubjects = Object.keys(sumBySubjects);
  keySubjects.map((subject) => {
    total += sumBySubjects[subject];
  });

  return (total / subjects).toFixed(decimals);
}
