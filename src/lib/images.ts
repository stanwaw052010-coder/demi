import { AVAILABLE_IMAGES } from "@/data/imageManifest";

export function imageExists(relPath: string): boolean {
  return AVAILABLE_IMAGES.has(relPath);
}
