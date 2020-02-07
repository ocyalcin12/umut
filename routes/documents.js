const router = require('express').Router();
const Document = require('../models/document');
const DocumentType = require('../models/documentType');
const Company = require('../models/company');
const User = require('../models/user');

//Get all Documents
router.route('/').get((req, res) => {
  Document.find()
    .then(documents => res.json(documents))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get a Document
router.route('/:id').get((req, res) => {
  Document.findById(req.params.id)
    .then(document => res.json(document))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Create a Document
router.route('/add').post((req, res) => {
  const companyName = req.body.companyName;
  const documentType = req.body.documentType;
  const description = req.body.description;
  const userName = req.body.userName;

  const newDocument = new Document({
    companyName,
    documentType,
    userName,
    description
  });

  newDocument
    .save()
    .then(() => res.json('Document added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Company
router.route('/:id').delete((req, res) => {
  Document.findByIdAndDelete(req.params.id)
    .then(() => res.json('Document deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Edit a document
router.route('/edit/:id').post((req, res) => {
  Document.findByIdAndUpdate(req.params.id)
    .then(document => {
      document.companyName = req.body.companyName;
      document.documentType = req.body.documentType;
      document.description = req.body.description;
      document.userName = req.body.userName;

      document
        .save()
        .then(() => res.json('Document edited!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
