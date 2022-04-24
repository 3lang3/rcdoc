import { genSiteEntry } from '../compiler/compile-site';

export async function restart() {
  await genSiteEntry();
}
