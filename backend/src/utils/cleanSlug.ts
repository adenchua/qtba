export default function cleanSlug(str: string): string {
  const noSpecialCharacters = removeSpecialCharacters(str);
  return changeSpacesToHyphen(noSpecialCharacters);
}

function removeSpecialCharacters(str: string): string {
  return str.toLowerCase().replace(/[^A-Za-z- ]/g, "");
}

function changeSpacesToHyphen(str: string): string {
  return str.toLowerCase().trim().replace(/ /g, "-"); //trim first to prevent '-' at start or at the back
}
