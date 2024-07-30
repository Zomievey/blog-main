import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    try {
      const suggestions = await db.collection("suggestions").find({}).toArray();
      res.status(200).json(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === "POST") {
    try {
      const newSuggestion = req.body;
      await db.collection("suggestions").insertOne(newSuggestion);
      res.status(201).json(newSuggestion);
    } catch (error) {
      console.error("Error inserting suggestion:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
