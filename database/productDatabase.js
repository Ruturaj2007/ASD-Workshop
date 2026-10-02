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

const writeProducts = async (products) => {
  await fs.writeFile(filePath, `${JSON.stringify(products, null, 2)}\n`);
};

const create = async (product) => {
  const products = await readProducts();
  const nextId = products.reduce((highestId, item) => Math.max(highestId, item.id), 0) + 1;
  const newProduct = { id: nextId, ...product };
  await writeProducts([...products, newProduct]);
  return newProduct;
};

const update = async (id, changes) => {
  const products = await readProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedProduct = { ...products[index], ...changes, id };
  products[index] = updatedProduct;
  await writeProducts(products);
  return updatedProduct;
};

const remove = async (id) => {
  const products = await readProducts();
  const remainingProducts = products.filter((product) => product.id !== id);

  if (remainingProducts.length === products.length) {
    return false;
  }

  await writeProducts(remainingProducts);
  return true;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
