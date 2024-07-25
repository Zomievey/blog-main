import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  if (req.method === "PUT") {
    const { id } = req.query;
    const { userId } = req.body;

    try {
      const post = await db.collection("posts").findOne({ _id: new ObjectId(id as string) });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      let update = {};
      if (post.dislikes && post.dislikes.includes(userId)) {
        // User has already disliked the post, remove dislike and add like
        update = {
          $inc: { likesCount: 1, dislikesCount: -1 },
          $addToSet: { likes: userId },
          $pull: { dislikes: userId },
        };
      } else if (!post.likes || !post.likes.includes(userId)) {
        // User has not liked the post yet
        update = {
          $inc: { likesCount: 1 },
          $addToSet: { likes: userId },
        };
      }

      await db.collection("posts").updateOne({ _id: new ObjectId(id as string) }, update);

      res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
