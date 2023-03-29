import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' })
    }

    await serverAuth(req)

    const { movieId } = req.query

    if (typeof movieId !== 'string') {
      return res.status(400).json({ message: 'Bad request' })
    }

    if (!movieId) {
      return res.status(400).json({ message: 'Bad request' })
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    })

    res.status(200).json(movie)
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'Internal server error' })
  }
}
