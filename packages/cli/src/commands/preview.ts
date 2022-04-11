/**
 * cli preview
 */
import { preview as vitePreview } from 'vite';
import { PROJECT_SITE_DIST_DIR } from '../common/constant';

export async function preview() {
  await vitePreview({
    build: {
      outDir: PROJECT_SITE_DIST_DIR,
    },
    preview: {
      open: true,
    },
  });
}
