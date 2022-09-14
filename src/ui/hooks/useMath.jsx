export function getAverage(marks, decimals) {
  let total = 0;
  let subjects = 0;
  let sumBySubjects = {};

  // Hacer suma por cada asignatura
  marks.map((mark) => {
    if (mark.asignatura in sumBySubjects == false) {
      subjects += 1;
      sumBySubjects[mark.asignatura] = 0;
    }
    sumBySubjects[mark.asignatura] += mark.nota * mark.total;
  });

  // Promediar las asignaturas
  let keySubjects = Object.keys(sumBySubjects);
  keySubjects.map((subject) => {
    total += sumBySubjects[subject];
  });

  return (total / subjects).toFixed(decimals);
}

export function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}