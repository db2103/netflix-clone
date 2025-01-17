import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique(
        {
          where: {
            id: movieId
          }
        }
      )

      if (!existingMovie) {
        res.status(404).json({ error: 'Movie not found' })
      }

      const updatedUser = await prismadb.user.update(
        {
          where: {
            email: currentUser.email || ''
          },
          data: {
            favoriteIds: {
              push: movieId
            }
          }
        }
      )
      return res.status(200).json(updatedUser)
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;
      console.log(req.body)

      const existingMovie = await prismadb.movie.findUnique(
        {
          where: {
            id: movieId
          }
        }
      )

      if (!existingMovie) {
        res.status(404).json({ error: 'Movie not found' })
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update(
        {
          where: {
            email: currentUser.email || ''
          },
          data: {
            favoriteIds: updatedFavoriteIds
          }
        }
      )
      return res.status(200).json(updatedUser)
    }

    return res.status(405).end();

  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}