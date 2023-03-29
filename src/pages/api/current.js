import HTTP_CAT_STATUS_CODES from '@/constants/httpCatStatusCodes'
import HTTP_STATUS_CODES from '@/constants/httpStatusCodes'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED).json({
      message: 'Method not allowed',
      image: HTTP_CAT_STATUS_CODES.METHOD_NOT_ALLOWED
    })
  }

  try {
    const { currentUser } = await serverAuth(req)

    return res.status(HTTP_STATUS_CODES.OK).json({ currentUser })
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Not authenticated' })
  }
}
