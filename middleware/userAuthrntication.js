import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function verifyToken(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' })

        req.userId = decoded.id
        req.userRole = decoded.role
        next()
    })
}
