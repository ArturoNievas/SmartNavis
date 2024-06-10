export function extractDomainFromUrl(url: string): string {
  const regExp: RegExp = new RegExp(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?(?<domain>[^/\n]+).*$/);
  if (regExp.test(url)) {
    return RegExp(regExp).exec(url)!.groups!['domain'];
  }
  throw new Error("URL inválida.");
}
