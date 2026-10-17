import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { demonstracoes } from "@/components/demos/catalogo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.marca.url;
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/exemplos`, changeFrequency: "monthly", priority: 0.8 },
    ...demonstracoes.map((d) => ({
      url: `${base}/exemplos/${d.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${base}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
