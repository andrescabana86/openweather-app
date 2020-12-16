/**
 * checkIfDuplicateExists returns true if duplicated items exists
 * otherwise it returns false
 * @param list
 */
export const checkIfDuplicateExists = (list: any[]) => {
  return new Set(list).size !== list.length;
};