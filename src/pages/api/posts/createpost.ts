import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import admin from "../../../utils/firebaseAdmin";

export const config = {
  api: {
    bodyParser: true, // Enable the body parser
    externalResolver: true, // Optional, only if you have external resolvers
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    const authToken = req.headers.authorization?.split("Bearer ")[1];

    if (!authToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(authToken);
      const user = await admin
        .firestore()
        .collection("users")
        .doc(decodedToken.uid)
        .get();

      if (!user.exists || user.data()?.role !== "admin") {
        return res.status(403).json({ error: "Forbidden" });
      }

      const newPost = req.body;
      await db.collection("posts").insertOne(newPost);
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error verifying token or creating post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
