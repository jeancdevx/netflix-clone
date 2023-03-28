import HTTP_CAT_STATUS_CODES from '@/constants/httpCatStatusCodes'
import HTTP_STATUS_CODES from '@/constants/httpStatusCodes'
import prisma from '@/libs/prismadb'
import { hash } from 'bcrypt'

async function createUser(email, name, password) {
  const hashedPassword = await hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      image: '',
      emailVerified: new Date()
    }
  })

  return user
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED).json({
        error: 'Method not allowed',
        image: HTTP_CAT_STATUS_CODES.METHOD_NOT_ALLOWED
      })
    }

    const { email, name, password } = req.body

    if (!email || !name || !password) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        error: 'Missing required fields',
        image: `https://http.cat/${HTTP_STATUS_CODES.BAD_REQUEST}`
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return res.status(HTTP_STATUS_CODES.FOUND).json({
        error: 'User already exists',
        image: `https://http.cat/${HTTP_STATUS_CODES.FOUND}`
      })
    }

    const user = await createUser(email, name, password)

    return res.status(HTTP_STATUS_CODES.CREATED).json({
      user
    })
  } catch (error) {
    console.error(error)

    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error',
      image: `https://http.cat/${HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR}`
    })
  }
}
