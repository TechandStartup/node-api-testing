const Article = require('../models/article');
const { formErrors } = require('./controllerMethods');

// GET /api/articles
exports.list = (req, res, next) => {
  Article.find()
    .sort({'title': 'asc'})
    .limit(50)
    .exec((err, articles) => {
      if (err) { 
        res.send(err);
      } else {
        res.json(articles);
      }
    });
};

// GET /articles/:id
exports.details = async (req, res, next) => { 
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).send('Not Found')
    }
    res.send(err);
  }
};

// POST /articles/create
exports.create = async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    console.log('New Article Created!', article);
    res.json({message: "Article successfully created", article });
  } catch (err) {
    if (err.name == 'ValidationError') {
      const errors = formErrors(err);
      console.error(errors);
      res.status(422).json({ article: req.body, errors: errors });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
};

// PATCH /articles/:id/update
exports.update = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    res.json({ message: 'Article updated', article });
  } catch (err) {
    if (err.name == 'ValidationError') {
      const errors = formErrors(err);
      res.status(422).json({ article: req.body, errors: errors });
    } else {
      res.status(500).send(err);
    }
  }
};

// DELETE /api/articles/:id/delete
exports.delete = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id, (err, article) => {
    if (err) { 
      res.status(500).send(err);
    } else if (!article) {
      res.status(422).send("Article not found.");
    } else {
      res.json({ message: "Article deleted", article }); 
    }
  })
};