# ASD Workshop Product API

A small Express application for working with a file-backed product API.

The application is built incrementally with separate route, controller, service, and database layers.

## Setup

```bash
npm install
npm run server
```

The server listens on `http://localhost:3000`.

## Endpoints

- `GET /products` lists products.
- `GET /products/:id` returns one product.
- `POST /products` creates a product.
- `PUT /products/:id` replaces product fields.
- `PATCH /products/:id` updates product fields.
- `DELETE /products/:id` removes a product.

Successful GET responses are cached in memory for one minute. The response includes `X-Cache: MISS` when data is loaded from the database and `X-Cache: HIT` when it is served from cache. Successful write requests clear all product cache entries.