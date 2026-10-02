const productService = require('../services/productService');

const parseId = (value) => Number.parseInt(value, 10);

const getProducts = async (req, res, next) => {
  try {
    res.json(await productService.getProducts());
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(parseId(req.params.id));

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
