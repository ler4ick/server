import { expressjwt } from 'express-jwt';
import config from '../config/config.json' assert { type: "json" };

function jwt() {
    const { secret } = config;
    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate'
        ]
    });
}

export default jwt