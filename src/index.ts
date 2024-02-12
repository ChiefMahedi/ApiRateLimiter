import express from 'express';
import TokenBucket from './TokenBucket/tokenBucket';
const app = express();

const tokenBucket = new TokenBucket(10, 1);
const rateLimitMiddleware = (req, res, next) => {
    if (tokenBucket.consumeToken()) {
        next();
    } else {
        res.status(429).send('Too Many Requests');
    }
};
app.get('/limited-route', rateLimitMiddleware, (req, res) => {
    res.send('Limited route accessed successfully');
});
app.get('/unlimited-route', (req, res) => {
    res.send('Unlimited route accessed successfully');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});