import { JobType, InternalJobType, CompanyType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { SSRFetcher } from "@/utils/api";

function generateSiteMap<
  T extends { slug: string; updatedAt?: string; createdAt: string }
>(data: T[], pageSubdirectory: string) {
  const URL = process.env.NEXT_PUBLIC_DOMAIN;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data
      .map((d) => {
        return `<url>
        <loc>${`${URL}/${pageSubdirectory}/${d.slug}`}</loc>
        <lastmod>${d.updatedAt ?? d.createdAt}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
      })
      .join("")}
</urlset>`;
}

//Generates sitemap on demand
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jobs = await SSRFetcher(`/jobs/sitemap?token=${req.query.token}`);
    const companies = await SSRFetcher(
      `/companies/sitemap?token=${req.query.token}`
    );

    const jobsSitemapData = generateSiteMap<JobType & InternalJobType>(
      jobs,
      "jobs"
    );
    const jobsSitemapPath = path.join("./", "public", "sitemap_jobs.xml");
    fs.writeFileSync(jobsSitemapPath, jobsSitemapData);

    const companiesSitemapData = generateSiteMap<CompanyType>(
      companies,
      "company"
    );
    const companiesSitemapPath = path.join(
      "./",
      "public",
      "sitemap_companies.xml"
    );
    fs.writeFileSync(companiesSitemapPath, companiesSitemapData);

    return res.json({ succes: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
