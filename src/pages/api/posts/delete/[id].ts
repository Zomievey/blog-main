import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../utils/mongodb';
import admin from '../../../../utils/firebaseAdmin';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    const authToken = req.headers.authorization?.split('Bearer ')[1];

    if (!authToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(authToken);
      const user = await admin.firestore().collection('users').doc(decodedToken.uid).get();

      if (!user.exists || user.data()?.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      if (typeof id === 'string') {
        await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
        res.status(204).end();
      } else {
        res.status(400).json({ error: 'Invalid post ID' });
      }
    } catch (error) {
      console.error('Error verifying token or deleting post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
