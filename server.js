const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;
const cache = new Map();
const cacheTtl = 60 * 1000;

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);

    if (cached && cached.expiresAt > Date.now()) {
        res.set('X-Cache', 'HIT');
        return res.status(cached.statusCode).json(cached.body);
    }

    if (cached) {
        cache.delete(key);
    }

    res.set('X-Cache', 'MISS');
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.set(key, {
                body,
                statusCode: res.statusCode,
                expiresAt: Date.now() + cacheTtl,
            });
        }

        return originalJson(body);
    };

    return next();
};

const invalidateCache = (req, res, next) => {
    res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.clear();
        }
    });

    next();
};

app.use(express.json());
app.use('/products', (req, res, next) => {
    if (req.method === 'GET') {
        return cacheMiddleware(req, res, next);
    }

    return invalidateCache(req, res, next);
});

app.use('/products', productRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

module.exports = app;