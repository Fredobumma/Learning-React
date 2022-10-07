export function uniqueKey(item, valueProperty) {
  const key = {};

  valueProperty.forEach((el) => {
    if (el in item) key.name = el;
  });

  return item[key.name];
}
