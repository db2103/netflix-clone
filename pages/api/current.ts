import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/lib/serverAuth';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    return res.status(200).json(currentUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}