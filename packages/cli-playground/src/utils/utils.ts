export function isAbsolute(path: string): boolean {
  return /^https?:\/\//.test(path);
}