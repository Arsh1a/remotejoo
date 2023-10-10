import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { limit = 20, page = 1, text, categories, origins } = req.query;

  const validatedLimit = parseInt(limit as string) ?? 20;
  const validatedPage = parseInt(page as string) ?? 1;
  const validatedText = text?.toString() ?? undefined;
  const validatedCategories = categories?.toString().split(",") ?? undefined;
  const validatedOrigins = origins?.toString().split(",") ?? undefined;

  const filter = {
    title: {
      contains: validatedText,
      mode: "insensitive",
    },
    category: {
      in: validatedCategories,
    },
    origin: {
      in: validatedOrigins,
    },
  } satisfies Prisma.ScrappedJobFindManyArgs["where"];

  const scrappedJobs = await prisma.scrappedJob.findMany({
    take: validatedLimit,
    skip: (validatedPage - 1) * validatedLimit,
    orderBy: [{ passedDays: "asc" }],
    where: filter,
  });

  const totalScrappedJobsCount = await prisma.scrappedJob.count({
    where: filter,
  });
  const totalPages = Math.ceil(totalScrappedJobsCount / validatedLimit);

  return res.json({
    jobs: scrappedJobs,
    totalJobs: totalScrappedJobsCount,
    totalPages: totalPages,
  });
}
