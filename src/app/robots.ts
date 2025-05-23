import { baseUrl } from "@/lib/constants";
import { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'AdsBot-Google',
        disallow: '/',
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
