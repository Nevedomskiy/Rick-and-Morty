//any, потому что мы не знаем какой обхъет поступит в сравнение, количество ключей и типы значений
function isEqual(a: any, b: any): boolean {
  // Если это примитивы, сравниваем их напрямую
  if (a === b) return true;

  // Если один из аргументов null или не объект, возвращаем false
  if (
    a === null ||
    b === null ||
    typeof a !== 'object' ||
    typeof b !== 'object'
  ) {
    return false;
  }

  // Получаем ключи объектов
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Если количество ключей разное, объекты не равны
  if (keysA.length !== keysB.length) return false;

  // Рекурсивно сравниваем значения каждого ключа
  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

export function containsCharacter<T>(
  selectedCharacters: T[],
  character: T
): boolean {
  return selectedCharacters.some((selectedCharacter) =>
    isEqual(selectedCharacter, character)
  );
}
