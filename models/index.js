// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
  as: 'product'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(ProductTag, { 
  through: ProductTag, 
  foreignKey: 'id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(ProductTag, { 
  through: ProductTag,
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
