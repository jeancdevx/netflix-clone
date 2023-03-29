import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'
import { without } from 'lodash'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req)
      const { movieId } = req.body

      const existingMovie = await prisma.movie.findUnique({
        where: {
          id: movieId
        }
      })

      if (!existingMovie) {
        return res.status(404).json({ message: 'Movie not found' })
      }

      const user = await prisma.user.update({
        where: {
          email: currentUser.email
        },
        data: {
          favoriteIds: {
            push: movieId
          }
        }
      })

      return res.status(200).json({ message: 'Movie added to favorites', user })
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req)
      const { movieId } = req.body

      const existingMovie = await prisma.movie.findUnique({
        where: {
          id: movieId
        }
      })

      if (!existingMovie) {
        return res.status(404).json({ message: 'Movie not found' })
      }

      const updateFavoriteIds = without(currentUser.favoriteIds, movieId)

      const user = await prisma.user.update({
        where: {
          email: currentUser.email
        },
        data: {
          favoriteIds: updateFavoriteIds
        }
      })

      return res
        .status(200)
        .json({ message: 'Movie removed from favorites', user })
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'Internal server error' })
  }
}
