import HTTP_CAT_STATUS_CODES from '@/constants/httpCatStatusCodes'
import HTTP_STATUS_CODES from '@/constants/httpStatusCodes'
import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED).json({
        message: 'Method not allowed',
        image: HTTP_CAT_STATUS_CODES.METHOD_NOT_ALLOWED
      })
    }

    const { currentUser } = await serverAuth(req)

    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds
        }
      }
    })

    return res.status(HTTP_STATUS_CODES.OK).json({ favoriteMovies })
  } catch (error) {
    console.log(error)

    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      image: HTTP_CAT_STATUS_CODES.INTERNAL_SERVER_ERROR
    })
  }
}
