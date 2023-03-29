import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' })
    }

    await serverAuth(req)

    const movies = await prisma.movie.findMany()

    res.status(200).json(movies)
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'Internal server error' })
  }
}
