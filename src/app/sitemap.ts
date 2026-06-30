import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { catalog } from "@/lib/catalog";
import { categories } from "@/lib/categories";
import { vehicles } from "@/lib/vehicles";

const siteUrl = "https://sprinter.org.ua";

const blogSlugs = [
  "zamina-amortyzatoriv-sprinter",
  "galmivni-kolodky-vito",
  "motorna-oliva-sprinter-cdi",
  "filtr-salonu-vw-crafter",
];

const staticRoutes = [
  "",
  "/catalog",
  "/oils",
  "/batteries",
  "/blog",
  "/about",
  "/contact",
  "/delivery",
  "/returns",
  "/warranty",
  "/search",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.6,
  }));

  const vehicleEntries: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
    url: `${siteUrl}/catalog/${vehicle.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/catalog?category=${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const productEntries: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const catalogItemEntries: MetadataRoute.Sitemap = catalog.map((row) => ({
    url: `${siteUrl}/catalog-item/${encodeURIComponent(row[0])}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...vehicleEntries,
    ...categoryEntries,
    ...productEntries,
    ...catalogItemEntries,
    ...blogEntries,
  ];
}
