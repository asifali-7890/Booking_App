import { createError } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(createError(401, 'You are not authorized to access this'));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(createError(404, 'Token is not valid'));

        req.hello = user;
        next();
    });
}

export const verifyUser = (req, res, next) => {

    verifyToken(req, res, next, () => {
        if (req.hello.id === req.params.id || req.hello.isAdmin) {
            next();
        } else {
            return next(createError(401, 'You are not authorized.'));
        }
    });
};

export const verifyAdmin = (req, res, next) => {

    verifyToken(req, res, next, () => {
        if (req.hello.isAdmin) {
            next();
        } else {
            return next(createError(401, 'You are not authorized.'));
        }
    });
};