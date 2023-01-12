const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({ include: { 
      model: Product, 
      through: ProductTag, 
      as: 'tagged_products' 
    }
  }).then( tagData => {
    res.status(200).json(tagData);
  });
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, { include: { 
      model: Product, 
      through: ProductTag, 
      as: 'tagged_products' 
    }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags with this id found!' });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  /*
{
		"tag_name" : "Adidas"
}
*/

  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then(tagName => {
    res.status(200).json(tagName);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });


});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value 12-15
  Tag.destroy({
    where: {
      id: req.params.id
    },
      force: true
  }).then(() => {
    const msg = 'Tag has been deleted.';
    res.status(200).json(msg);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;