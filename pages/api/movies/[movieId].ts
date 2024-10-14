import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    movieId
  } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    await serverAuth(req, res);

    if( typeof movieId !== "string") {
      return res.status(400).end("Invalid Id")
    }
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      res.status(404).json({ success: false, message: 'Movie not found' });
      return;
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}