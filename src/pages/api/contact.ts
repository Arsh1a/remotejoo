import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, subject, email, message } = req.body;

  try {
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        subject,
        email,
        message,
      },
    });

    // Send back the created message (or any other response you want)
    res.status(200).json(contactMessage);
  } catch (error) {
    // Handle the error (e.g. sending a 500 Internal Server Error response)
    res.status(500).json({ error: "Internal Server Error" });
  }
}
