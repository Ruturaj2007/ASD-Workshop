const productDatabase = require('../database/productDatabase');

const getProducts = () => productDatabase.findAll();
const getProductById = (id) => productDatabase.findById(id);

module.exports = {
  getProducts,
  getProductById,
};
