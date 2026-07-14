import type { MetadataRoute } from "next";

/** Required for static export compatibility. */
export const dynamic = "force-static";

/**
 * Generates /robots.txt at build time (static export).
 * - Allows all crawlers on all routes
 * - Points to the sitemap at https://www.aleeqa.app/sitemap.xml
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.aleeqa.app/sitemap.xml",
    host: "https://www.aleeqa.app",
  };
}
