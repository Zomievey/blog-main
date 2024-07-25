import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  if (req.method === 'PUT') {
    const { id } = req.query;
    const updatedComment = req.body;
    await db.collection('comments').updateOne(
      { _id: new ObjectId(id as string) },
      { $set: updatedComment }
    );
    res.status(200).json(updatedComment);
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
