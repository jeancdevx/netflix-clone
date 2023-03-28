import HTTP_CAT_STATUS_CODES from '@/constants/httpCatStatusCodes'
import HTTP_STATUS_CODES from '@/constants/httpStatusCodes'
import prismadb from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED).json({
        message: 'Method not allowed',
        image: HTTP_CAT_STATUS_CODES.METHOD_NOT_ALLOWED
      })
    }

    await serverAuth(req)

    const moviesCount = await prismadb.movie.count()
    const randomIndex = Math.floor(Math.random() * moviesCount)

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex
    })

    return res.status(HTTP_STATUS_CODES.OK).json(randomMovies[0])
  } catch (error) {
    console.log(error)

    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      image: HTTP_CAT_STATUS_CODES.INTERNAL_SERVER_ERROR
    })
  }
}
