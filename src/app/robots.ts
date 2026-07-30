import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/calculator"],
        disallow: ["/admin", "/api", "/report"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
