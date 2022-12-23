export default {
    jwt: {
        secret: process.env.APP_SECRET || 'oi',
        expiresIn: '1d',
    },
};
