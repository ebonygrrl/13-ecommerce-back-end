const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({ include: [Product] }).then( catData => {
    res.status(200).json(catData);
  });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, { include:  [Product] });
    if (!catData) {
      res.status(404).json({ message: 'There is no category with this id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {

/* req.body should look like this...
{
  "category_name": "Sports"
}
{
  "category_name": "Appliances"
}
*/

  // create a new category
  Category.create(req.body)
    .then((category) => {
      // if no product tags, just respond
      res.status(200).json(category);
    })
    .then((catIds) => res.status(200).json(catIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then(catName => {
    res.status(200).json(catName);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
