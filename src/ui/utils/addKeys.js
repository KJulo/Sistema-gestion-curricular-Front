export function addKeys (array) {
  return array.map((item, index) => {
    item['key'] = index.toString();
  })
}