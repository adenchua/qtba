export default function getSlugFromTitle(title: string): string {
  return title.toLowerCase().replace(/ /g, "-");
}
