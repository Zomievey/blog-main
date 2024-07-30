//api/suggestions/suggestions.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    const newSuggestion = req.body;
    await db.collection("suggestions").insertOne(newSuggestion);
    res.status(201).json(newSuggestion);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
