import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'POST': {
      const { postId, content, author, createdAt } = req.body;

      // Fetch the username from the users collection
      const userDoc = await db.collection('users').findOne({ email: author });
      const username = userDoc ? userDoc.username : 'Unknown User';

      const newComment = {
        postId: new ObjectId(postId),
        content,
        author,
        username, 
        createdAt
      };

      await db.collection('comments').insertOne(newComment);
      res.status(201).json(newComment);
      break;
    }

    case 'GET': {
      const { postId } = req.query;
      const comments = await db.collection('comments').find({ postId: new ObjectId(postId as string) }).toArray();
      res.status(200).json(comments);
      break;
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
    }
  }
}
