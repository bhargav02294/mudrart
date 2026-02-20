// utils/slugify.js
import slugifyLib from "slugify";

export function toSlug(text) {
  return slugifyLib(text || "", {
    lower: true,
    strict: true,
    trim: true
  });
}


