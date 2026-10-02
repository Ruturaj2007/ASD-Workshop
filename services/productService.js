const productDatabase = require('../database/productDatabase');

const getProducts = () => productDatabase.findAll();
const getProductById = (id) => productDatabase.findById(id);
const createProduct = (product) => productDatabase.create(product);
const updateProduct = (id, changes) => productDatabase.update(id, changes);
const deleteProduct = (id) => productDatabase.remove(id);

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
