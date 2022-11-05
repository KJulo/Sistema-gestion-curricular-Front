/**
 * @param {*} Array Arreglo de objetos que contengan nota y ponderacion
 * @returns float
 */
export function getAverage(marks) {
  const onlyMarks = marks.map((m) => parseFloat(m.nota));
  return onlyMarks.reduce((a, b) => a + b, 0) / onlyMarks.length;
}
