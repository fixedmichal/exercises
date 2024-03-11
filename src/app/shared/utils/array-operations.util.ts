export function shuffleArray<T>(array: T[]): T[] {
  let arrayLength = array.length, lastArrayElement, randomArrayIndex;
  const newArray = [...array];

  while (arrayLength) {
    randomArrayIndex = Math.floor(Math.random() * arrayLength--);
    lastArrayElement = array[arrayLength];
    array[arrayLength] = array[randomArrayIndex];
    array[randomArrayIndex] = lastArrayElement;
  }

  return newArray;
}