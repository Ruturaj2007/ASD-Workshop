const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '..', 'db.json');

const readProducts = async () => {
  const contents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(contents);
};

const findAll = async () => readProducts();

const findById = async (id) => {
  const products = await readProducts();
  return products.find((product) => product.id === id);
};

module.exports = {
  findAll,
  findById,
};
