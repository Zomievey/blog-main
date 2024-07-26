import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import admin from "../../../utils/firebaseAdmin";

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Received request at createpost API");

  const { db } = await connectToDatabase();
  console.log("Connected to the database");

  if (req.method === "POST") {
    const authToken = req.headers.authorization?.split("Bearer ")[1];

    if (!authToken) {
      console.log("No auth token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(authToken);
      console.log("Token verified successfully");

      const user = await admin
        .firestore()
        .collection("users")
        .doc(decodedToken.uid)
        .get();

      if (!user.exists || user.data()?.role !== "admin") {
        console.log("User does not have admin rights");
        return res.status(403).json({ error: "Forbidden" });
      }

      const newPost = req.body;
      console.log("Inserting new post:", newPost);

      await db.collection("posts").insertOne(newPost);
      console.log("Post inserted successfully");

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
