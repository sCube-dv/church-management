import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate requests using JWT
const auth = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        //console.log('Decoded JWT:', decoded);
        req.id_user = decoded.id_user; // Attach decoded user info to request object
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    next();
};

export default auth;
