import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await db.collection('comments').deleteOne({ _id: new ObjectId(id as string) });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
